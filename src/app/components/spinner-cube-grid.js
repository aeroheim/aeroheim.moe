import React from 'react';
import styles from '../static/styles/components/spinner-cube-grid.css';

// Based off of the cube-grid spinner from https://github.com/tobiasahlin/SpinKit.
const SpinnerCubeGrid = ({ className, color }) =>
{
    return (
        <div className={`${styles.cubeGrid} ${className}`}>
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
    );
}

export default SpinnerCubeGrid;