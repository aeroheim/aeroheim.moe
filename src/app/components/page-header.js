import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/page-header.css';

const PageHeader = ({ text, className, color, show }) =>
{
    const inTransitions =
    {
        header: styles.headerInTransition,
        headerText: styles.headerTextInTransition,
    }

    const inStyles =
    {
        header: styles.headerIn,
        headerText: styles.headerTextIn,
    }

    const outTransitions =
    {
        header: styles.headerOutTransition,
        headerText: styles.headerTextOutTransition,
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
                        <h1 className={`${styles.headerText} ${transitionStyles['headerText']}`} onTransitionEnd={onTransitionEnd}>
                            {text}
                            <div className={`${styles.headerTextDecoration} ${color}`}/>
                        </h1>
                        <div className={styles.headerBar}/>
                    </header>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default PageHeader;