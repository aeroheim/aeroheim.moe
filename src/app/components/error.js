import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/error-not-found.css';

const Error = ({ title, text, show }) =>
{
    const inTransitions =
    {
        content: new Transition(styles.contentInTransition, 'opacity', 'clip-path'),
    }

    const inStyles =
    {
        content: styles.contentIn,
    }

    const outTransitions =
    {
        content: new Transition(styles.contentOutTransition, 'opacity'),
    }

    const outStyles =
    {
        content: styles.contentOut,
    }

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show} test='error'>
            {({ transitionStyles }) => {
                return (
                    <div className={`${styles.content} ${transitionStyles['content']}`}>
                        <div className={styles.container}>
                            <h1 className={styles.header}>{title}</h1>
                            <p className={styles.subtext}>{text}</p>
                        </div>
                    </div>
                );
            }}
        </AnimatedCSSTransition>
    );
}

const ErrorNotFound = ({ show }) =>
{
    return <Error title='404' text="there's nothing here" show={show}/>;
}

const ErrorStatus = ({ status, show }) =>
{
    return <Error title={status} text="something went wrong. try again later" show={show}/>;
}

class ErrorHandler extends React.Component
{
    constructor(props)
    {
        super(props);
        this.title = 'error';
        this.text = "something went wrong. try again later";
    }

    render()
    {
        if (this.props.err)
        {
            this.title = `${this.props.err.response.status}`;
            switch(this.props.err.response.status)
            {
                case 404:
                    this.text = "there's nothing here";
                    break;
                default:
                    this.text = "something went wrong. try again later";
            }
        }

        return <Error title={this.title} text={this.text} show={this.props.err !== null}/>;
    }
}

export { Error, ErrorNotFound, ErrorStatus, ErrorHandler };