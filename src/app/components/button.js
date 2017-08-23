import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/button.css';

const Button = ({ className, children, onClick, animate, show }) =>
{
    const inTransitions =
    {
        button: new Transition(styles.buttonInTransition, 'opacity'),
    }

    const inStyles =
    {
        button: styles.buttonIn,
    }

    const outTransitions =
    {
        button: new Transition(styles.buttonOutTransition, 'opacity'),
    }

    const outStyles =
    {
        button: styles.buttonOut,
    }

    if (animate)
    {
        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
                {({ transitionStyles }) => {
                    return (
                        <button className={`${styles.button} ${className} ${transitionStyles['button']}`} onClick={onClick}>
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