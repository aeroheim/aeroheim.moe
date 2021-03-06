import React from 'react';
import HomeMainButton from './home-main-button';
import HomeExternalButton from './home-external-button';
import Logo from './logo';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import Stagger from './stagger';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/home.css';

const Home = ({ className, match }) => {
  const inTransitions = {
    logoBox: new Transition(styles.logoBoxInTransition, 'opacity', 'clip-path'),
    buttons: new Transition(styles.buttonsInTransition, 'opacity'),
  };
  const inStyles = {
    logoBox: styles.logoBoxIn,
    buttons: styles.buttonsIn,
  };
  const outTransitions = {
    logoBox: new Transition(styles.logoBoxOutTransition, 'opacity', 'clip-path'),
    buttons: new Transition(styles.buttonsOutTransition, 'opacity'),
  };
  const outStyles = {
    logoBox: styles.logoBoxOut,
    buttons: styles.buttonsOut,
  };

  return (
    <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match !== null}>
      {({ transitionStyles, onTransitionEnd }) => (
        <div className={`${className} ${styles.content}`} onTransitionEnd={onTransitionEnd}>
          <div className={styles.contentGrid}>
            <div className={styles.mainContentFlex}>
              <div className={`${styles.logoBox} ${transitionStyles.logoBox}`}>
                <Logo show={match !== null} />
              </div>
              <nav className={`${styles.mainLinksGrid} ${transitionStyles.buttons}`}>
                <Stagger delay={75}>
                  <HomeMainButton show={match !== null} link="/blog" header="blog" subtext="thoughts and reflections" color={styles.blogColor} />
                  <HomeMainButton show={match !== null} link="/projects" header="projects" subtext="coding works / projects" color={styles.projectsColor} />
                  <HomeMainButton show={match !== null} link="/about" header="about" subtext="introduction & bio" color={styles.aboutColor} />
                </Stagger>
              </nav>
            </div>
            <nav className={`${styles.externalLinksFlex} ${transitionStyles.buttons}`}>
              <HomeExternalButton className={styles.externalLink} link="https://github.com/aeroheim" Icon={GithubIcon} />
              <HomeExternalButton className={styles.externalLink} link="https://twitter.com/aeroheim" Icon={TwitterIcon} />
              <HomeExternalButton className={styles.externalLink} link="https://www.linkedin.com/in/benjamin-pang-45621290" Icon={LinkedInIcon} />
            </nav>
          </div>
        </div>
      )}
    </AnimatedCSSTransition>
  );
};

export default Home;
