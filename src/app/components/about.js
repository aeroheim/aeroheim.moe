import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import PageHeader from './page-header';
import styles from '../static/styles/components/about.css';

const About = (props) =>
{
    const inTransitions =
    {
        bio: styles.bioInTransition,
    }

    const inStyles =
    {
        bio: styles.bioIn,
    }

    const outTransitions =
    {
        bio: styles.bioOutTransition,
    }

    const outStyles =
    {
        bio: styles.bioOut,
    }

    const age = new Date(Date.now() - new Date('1993/01/21')).getFullYear() - 1970;

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={props.match}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <div className={styles.content}>
                        <PageHeader className={styles.headerStyle} color={styles.headerColor} show={props.match}>ABOUT</PageHeader>
                        <article className={`${styles.bio} ${transitionStyles['bio']}`} onTransitionEnd={onTransitionEnd}>
                            <h1>Benjamin Pang (龐天擇).</h1>
                            <p>{`I'm a ${age}-year-old Software Engineer working in Austin, Texas. I graduated from The University of Texas at Austin with a B.S. in Computer Science in 2015.`}</p>
                            <p>My hobbies include collecting keyboards, coding, and gaming (especially rhythm games).</p>
                            <p>contact: <a href='mailto:aeroheim@gmail.com' className={styles.bioLink}>aeroheim@gmail.com</a></p>
                        </article>
                    </div>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default About;