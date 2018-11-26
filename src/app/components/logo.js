import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/logo.css';

class Logo extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const inTransitions =
        {
            fill: new Transition(styles.fillInTransition, 'stroke-dashoffset'),
            shadow: new Transition(styles.shadowInTransition, 'opacity'),
        }

        const inStyles =
        {
            fill: styles.fillIn,
            shadow: styles.shadowIn,
        }

        const outTransitions =
        {
            fill: new Transition(styles.fillOutTransition, 'stroke-dashoffset'),
            shadow: new Transition(styles.shadowOutTransition, 'opacity'),
        }

        const outStyles =
        {
            fill: styles.fillOut,
            shadow: styles.shadowOut,
        }

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.show}>
                {({ transitionStyles, onTransitionEnd }) => {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 154" className={styles.svg} onTransitionEnd={onTransitionEnd}>
                            <path className={`${styles.shadow} ${transitionStyles['shadow']}`} d="M32.85,142.3a16.07,16.07,0,0,1-10.78-3.94c-4.67-4.18-6.36-11.17-4.33-17.82,1.47-4.79,4.45-8.53,7.45-11.85,12.54-13.9,42-30.28,49.29-34.25,3.45-6.54,6.74-14.27,5.3-17.87C79,55.23,78.91,55.13,78.7,55c-2-1.35-5.25-1-6.73-.6-14.26,3.73-34.51,21.86-38,34L19.55,84.29C24.51,67,48.6,45,68.18,39.88c2.57-.67,11.53-2.45,19.07,2.78a16.07,16.07,0,0,1,4.37,4.5,133.11,133.11,0,0,1,18.63-21.47c2.88-2.63,6.43-5.52,10.93-7,6-2,12.47-.87,16.75,3,4.67,4.18,6.36,11.17,4.33,17.82-1.47,4.79-4.45,8.53-7.45,11.85-12.54,13.9-42,30.28-49.29,34.25-3.45,6.54-6.74,14.27-5.3,17.87.74,1.34.87,1.44,1.08,1.58,2,1.35,5.25,1,6.73.6,14.26-3.73,34.51-21.86,38-34l14.42,4.13c-5,17.3-29,39.29-48.63,44.41-2.57.67-11.53,2.45-19.07-2.78a16.07,16.07,0,0,1-4.37-4.5,133.11,133.11,0,0,1-18.63,21.47c-2.88,2.63-6.43,5.52-10.93,7A18.9,18.9,0,0,1,32.85,142.3Zm24.9-40.46c-8.26,5.4-16.56,11.5-21.43,16.9-1.71,1.9-3.59,4.1-4.24,6.2a3.26,3.26,0,0,0,0,2.28,3.53,3.53,0,0,0,2-.14c1.83-.6,3.75-2.21,5.55-3.85A123.06,123.06,0,0,0,57.75,101.84ZM127.24,32.7a4.17,4.17,0,0,0-1.33.22c-1.83.6-3.75,2.21-5.55,3.85a123.43,123.43,0,0,0-18.11,21.39c8.26-5.4,16.56-11.5,21.43-16.9,1.71-1.9,3.59-4.1,4.24-6.2a3.26,3.26,0,0,0,0-2.28A2.08,2.08,0,0,0,127.24,32.7Z"/>
                            <path className={`${styles.fill} ${transitionStyles['fill']}`} d="M78.19,76.86c-10.28,18.67-7.7,24.13-6.53,26.72,1.2,2.23,2,3.36,3.55,4.46,4.71,3.26,10.8,2.23,12.9,1.68,16.92-4.42,39-24.32,43.32-39.21M78.59,76.65s35.49-18.71,48.84-33.5c2.42-2.69,4.78-5.57,5.84-9s.54-7.62-2.15-10c-2.47-2.21-6.24-2.47-9.39-1.43s-5.79,3.2-8.24,5.43C99.41,40.93,89.49,57.59,79.78,74l-1.59,2.88Zm-.81.42S42.29,95.78,28.94,110.58c-2.42,2.68-4.78,5.57-5.84,9s-.54,7.62,2.16,10c2.47,2.21,6.23,2.48,9.38,1.43s5.79-3.19,8.24-5.43c14.08-12.84,24-29.49,33.71-45.89l1.6-2.88Zm.41-.21c10.28-18.67,7.69-24.13,6.52-26.71-1.2-2.23-2-3.36-3.55-4.46-4.7-3.26-10.8-2.24-12.9-1.69C51.34,48.42,29.22,68.33,25,83.22"/>
                        </svg>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
}

export default Logo;