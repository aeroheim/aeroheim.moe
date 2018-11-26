import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/spinner-cube-grid.css';

// Based off of the cube-grid spinner from https://github.com/tobiasahlin/SpinKit
const SpinnerCubeGrid = ({ className, show }) =>
{
    const inTransitions =
    {
        cubeGrid: new Transition(styles.cubeGridInTransition, 'opacity'),
    }

    const inStyles =
    {
        cubeGrid: styles.cubeGridIn,
    }

    const outTransitions =
    {
        cubeGrid: new Transition(styles.cubeGridOutTransition, 'opacity'),
    }

    const outStyles =
    {
        cubeGrid: styles.cubeGridOut,
    }

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <div className={`${styles.cubeGrid} ${transitionStyles['cubeGrid']} ${className}`} onTransitionEnd={onTransitionEnd}>
                        <div className={styles.content}>
                            <div className={styles.cubeOne}></div>
                            <div className={styles.cubeTwo}></div>
                            <div className={styles.cubeThree}></div>
                            <div className={styles.cubeFour}></div>
                            <div className={styles.cubeFive}></div>
                            <div className={styles.cubeSix}></div>
                            <div className={styles.cubeSeven}></div>
                            <div className={styles.cubeEight}></div>
                            <div className={styles.cubeNine}></div>
                        </div>
                    </div>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default SpinnerCubeGrid;