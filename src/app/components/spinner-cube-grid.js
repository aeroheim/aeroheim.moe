import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/spinner-cube-grid.css';

// Based off of the cube-grid spinner from https://github.com/tobiasahlin/SpinKit
const SpinnerCubeGrid = ({ className, color, show }) =>
{
    const inTransitions =
    {
        cubeGrid: styles.cubeGridInTransition,
    }

    const inStyles =
    {
        cubeGrid: styles.cubeGridIn,
    }

    const outTransitions =
    {
        cubeGrid: styles.cubeGridOutTransition,
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
                            <div className={`${styles.cubeOne} ${color}`}></div>
                            <div className={`${styles.cubeTwo} ${color}`}></div>
                            <div className={`${styles.cubeThree} ${color}`}></div>
                            <div className={`${styles.cubeFour} ${color}`}></div>
                            <div className={`${styles.cubeFive} ${color}`}></div>
                            <div className={`${styles.cubeSix} ${color}`}></div>
                            <div className={`${styles.cubeSeven} ${color}`}></div>
                            <div className={`${styles.cubeEight} ${color}`}></div>
                            <div className={`${styles.cubeNine} ${color}`}></div>
                        </div>
                    </div>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default SpinnerCubeGrid;