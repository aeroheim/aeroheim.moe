import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import { setAppError, clearAppError, NotFoundError, NotImplementedError } from '../actions/app-actions';
import styles from '../static/styles/components/error-not-found.css';

class ErrorHandler extends React.PureComponent
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        // Check for initial 404.
        if (this.props.error === null)
        {
            this.initializeError();
        }
    }

    componentDidUpdate(prevProps)
    {
        // Error should only be re-initialized if a route transition occurred without the error changing,
        // or if the route changed while the current error is a 404.
        if ((this.props.error === 404 || this.props.error === prevProps.error) && this.props.activeRoutes !== prevProps.activeRoutes)
        {
            this.initializeError();
        }
    }

    initializeError()
    {
        // No route matched - 404 error.
        if (this.props.activeRoutes.size === 0)
        {
            this.props.setAppError(404);
        }
        // Route changed - clear error.
        else if (this.props.error !== null)
        {
            this.props.clearAppError();
        }
    }

    render()
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
    
        let title = 'error';
        let text = 'something went wrong. try again later';
        if (this.props.error !== null)
        {
            switch(this.props.error)
            {
                case NotImplementedError:
                    title = 'WIP';
                    text = 'coming soon. check again later';
                    break;
                case NotFoundError:
                    title = this.props.error;
                    text = "there's nothing here";
                    break;
            }
        }

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.error !== null}>
                {({ transitionStyles }) => {
                    return (
                        <div className={`${this.props.className} ${styles.content} ${transitionStyles['content']}`}>
                            <h1 className={styles.header}>{title}</h1>
                            <p className={styles.text}>{text}</p>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
}

function mapStateToProps(state)
{
    return {
        error: state.app.error,
        activeRoutes: state.routes.activeRoutes,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        setAppError: (error) => dispatch(setAppError(error)),
        clearAppError: () => dispatch(clearAppError()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ErrorHandler));