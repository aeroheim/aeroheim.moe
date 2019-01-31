import React from 'react';
import LinkButton from './link-button';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/home-main-button.css';

const HomeMainButton = ({ show, link, header, subtext, color, className }) => {
  const inTransitions = {
    content: new Transition(styles.contentInTransition, 'opacity', 'background-color', 'width'),
  };
  const inStyles = {
    content: styles.contentIn,
  };
  const outTransitions = {
    content: new Transition(styles.contentOutTransition, 'opacity'),
  };
  const outStyles = {
    content: styles.contentOut,
  };

  return (
    <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
      {({ transitionStyles, onTransitionEnd }) => (
        <LinkButton link={link} className={`${styles.linkButton} ${transitionStyles.content} ${className}`} onTransitionEnd={onTransitionEnd}>
          <div className={`${styles.colorBar} ${color}`} />
          <div className={`${styles.colorBarHover} ${color}`} />
          <h2 className={styles.header}>{header}</h2>
          <p className={styles.subtext}>{subtext}</p>
        </LinkButton>
      )}
    </AnimatedCSSTransition>
  );
};

export default HomeMainButton;
