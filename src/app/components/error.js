import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/error-not-found.css';

const Error = ({ title, text, show }) =>
{
    const inTransitions =
    {
        content: styles.contentInTransition,
    }

    const inStyles =
    {
        content: styles.contentIn,
    }

    const outTransitions =
    {
        content: styles.contentOutTransition,
    }

    const outStyles =
    {
        content: styles.contentOut,
    }

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
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

const ErrorCode = ({ errorCode, show }) =>
{
    return <Error title={errorCode} text="something went wrong. try again later" show={show}/>;
}

export { ErrorNotFound, ErrorCode };