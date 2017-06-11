import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/button.css';

const Button = ({ className, children, onClick, animate, show }) =>
{
    const inTransitions =
    {
        button: styles.buttonInTransition,
    }

    const inStyles =
    {
        button: styles.buttonIn,
    }

    const outTransitions =
    {
        button: styles.buttonOutTransition,
    }

    const outStyles =
    {
        button: styles.buttonOut,
    }

    if (animate)
    {
        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
                {({ transitionStyles, onTransitionEnd }) => {
                    return (
                        <button className={`${styles.button} ${className} ${transitionStyles['button']}`} onTransitionEnd={onTransitionEnd} onClick={onClick}>
                            {children}
                        </button>
                    );
                }}
            </AnimatedCSSTransition> 
        );
    }
    else
    {
        return (
            <button className={`${styles.button} ${className}`} onClick={onClick}>
                {children}
            </button>
        );
    }
}

export default Button;