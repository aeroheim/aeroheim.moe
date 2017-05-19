import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/error-not-found.css';

const ErrorNotFound = (props) =>
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
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={props.match}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                        <div className={styles.container}>
                            <h1 className={styles.header}>404</h1>
                            <p className={styles.subtext}>there's nothing here.</p>
                        </div>
                    </div>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default ErrorNotFound;