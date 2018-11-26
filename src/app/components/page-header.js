import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/page-header.css';

const PageHeader = ({ children, className, color, show }) =>
{
    const inTransitions =
    {
        header: new Transition(styles.headerInTransition, 'width', 'opacity'),
        headerText: new Transition(styles.headerTextInTransition, 'clip-path'),
    }

    const inStyles =
    {
        header: styles.headerIn,
        headerText: styles.headerTextIn,
    }

    const outTransitions =
    {
        header: new Transition(styles.headerOutTransition, 'opacity'),
        headerText: new Transition(styles.headerTextOutTransition, 'opacity'),
    }

    const outStyles =
    {
        header: styles.headerOut,
        headerText: styles.headerTextOut,
    }

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <header className={`${styles.header} ${className} ${transitionStyles['header']}`} onTransitionEnd={onTransitionEnd}>
                        <div className={styles.headerTextContainer}>
                            <h1 className={`${styles.headerText} ${transitionStyles['headerText']}`}>
                                {children}
                            </h1>
                            <div className={`${styles.headerTextDecoration} ${color}`}/>
                        </div>
                        <div className={styles.headerBar}/>
                    </header>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default PageHeader;