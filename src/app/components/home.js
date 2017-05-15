import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedCSSTransition from './animated-css-transition';
import LinkButton from './link-button';
import HomeMainButton from './home-main-button';
import HomeExternalButton from './home-external-button';
import SVGInline from 'react-svg-inline';
import Logo from '../static/img/icons/logo-path.svg';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import styles from '../static/styles/components/home.css';

const Home = ({ match }) =>
{
    const inTransitions =
    {
        logoFrame: styles.logoFrameInTransition,
        logo: styles.logoInTransition,
        buttons: styles.buttonsInTransition,
    }

    const inStyles =
    {
        logoFrame: styles.logoFrameInStyle,
        logo: styles.logoInStyle,
        buttons: styles.buttonsInStyle,
    }

    const outTransitions =
    {
        logoFrame: styles.logoFrameOutTransition,
        logo: styles.logoOutTransition,
        buttons: styles.buttonsOutTransition,
    }

    const outStyles =
    {
        logoFrame: styles.logoFrameOutStyle,
        logo: styles.logoOutStyle,
        buttons: styles.buttonsOutStyle,
    }

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match ? true : false}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <div className={styles.content}>
                        <div className={`${styles.logoFrame} ${transitionStyles['logoFrame']}`} onTransitionEnd={onTransitionEnd}>
                            <SVGInline svg={Logo} className={`${styles.logo} ${transitionStyles['logo']}`} onTransitionEnd={onTransitionEnd}/>
                        </div>
                        <nav className={`${styles.mainLinksRow} ${transitionStyles['buttons']}`} onTransitionEnd={onTransitionEnd}>
                            <div className={styles.link}>
                                <HomeMainButton link="/moonlight" header="moonlight" subtext="aesthetic music player" color={styles.moonlightColor}/>
                            </div>
                            <div className={styles.link}>
                                <HomeMainButton link="/bumps" header="bumps" subtext="favorite beats with art" color={styles.bumpsColor}/>
                            </div>
                            <div className={styles.link}>
                                <HomeMainButton link="/blog" header="blog" subtext="thoughts and reflections" color={styles.blogColor}/>
                            </div>
                        </nav>
                        <nav className={`${styles.externalLinksRow} ${transitionStyles['buttons']}`} onTransitionEnd={onTransitionEnd}>
                            <div className={styles.externalLink}>
                                <HomeExternalButton link="https://github.com/aeroheim" icon={GithubIcon}/>
                            </div>
                            <div className={styles.externalLink}>
                                <HomeExternalButton link="https://twitter.com/aeroheim" icon={TwitterIcon}/>
                            </div>
                            <div className={styles.externalLink}>
                                <HomeExternalButton link="https://www.linkedin.com/in/benjamin-pang-45621290" icon={LinkedInIcon}/>
                            </div>
                        </nav>
                    </div>);
            }}
        </AnimatedCSSTransition>
    );
};

export default Home;