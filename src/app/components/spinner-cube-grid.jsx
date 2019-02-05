import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/spinner-cube-grid.css';

// Based off of the cube-grid spinner from https://github.com/tobiasahlin/SpinKit
const SpinnerCubeGrid = ({ className, show }) => {
  const inTransitions = {
    cubeGrid: new Transition(styles.cubeGridInTransition, 'opacity'),
  };

  const inStyles = {
    cubeGrid: styles.cubeGridIn,
  };

  const outTransitions = {
    cubeGrid: new Transition(styles.cubeGridOutTransition, 'opacity'),
  };

  const outStyles = {
    cubeGrid: styles.cubeGridOut,
  };

  return (
    <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
      {({ transitionStyles, onTransitionEnd }) => (
        <div className={`${styles.cubeGrid} ${transitionStyles.cubeGrid} ${className}`} onTransitionEnd={onTransitionEnd}>
          <div className={styles.content}>
            <div className={styles.cubeOne} />
            <div className={styles.cubeTwo} />
            <div className={styles.cubeThree} />
            <div className={styles.cubeFour} />
            <div className={styles.cubeFive} />
            <div className={styles.cubeSix} />
            <div className={styles.cubeSeven} />
            <div className={styles.cubeEight} />
            <div className={styles.cubeNine} />
          </div>
        </div>
      )}
    </AnimatedCSSTransition>
  );
};

export default SpinnerCubeGrid;
