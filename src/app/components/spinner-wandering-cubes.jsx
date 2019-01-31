import React from 'react';
import styles from '../static/styles/components/spinner-wandering-cubes.css';

// Based off of the wandering-cubes spinner from https://github.com/tobiasahlin/SpinKit.
const SpinnerWanderingCubes = ({ className, color }) => (
  <div className={`${styles.cube} ${className}`}>
    <div className={`${styles.cubeOne} ${color}`} />
    <div className={`${styles.cubeTwo} ${color}`} />
  </div>
);

export default SpinnerWanderingCubes;
