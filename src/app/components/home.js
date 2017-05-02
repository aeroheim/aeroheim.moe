import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTransition from './animated-transition';
import LinkButton from './link-button';
import HomeMainButton from './home-main-button';
import HomeExternalButton from './home-external-button';
import VerticalAlign from './vertical-align';
import SVGInline from 'react-svg-inline';
import Logo from '../static/img/icons/logo-path.svg';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import styles from '../static/styles/components/home.css';

const Home = ({ match }) =>
{
    const transitionIns = 
    {
        strokeLogo: 
        {
            from: 866,
            to: 0,
            duration: 650,
            easing: 'easeSinOut'
        },
        revealLogo: 
        {
            from: 0,
            to: 200,
            duration: 650,
            easing: 'easeCubicOut'
        },
        fadeLogo:
        {
            from: 0,
            to: 1,
            duration: 650,
            easing: 'easeCubicOut'
        },
        fadeButtons:
        {
            from: 0,
            to: 1,
            duration: 650,
            delay: 150,
            easing: 'easeCubicOut'
        }
    }

    const transitionOuts =
    {
        strokeLogo: 
        {
            from: 0,
            to: 866,
            duration: 650,
            easing: 'easeSinIn'
        },
        revealLogo: 
        {
            from: 200,
            to: 0,
            duration: 650,
            easing: 'easeCubicIn'
        },
        fadeLogo:
        {
            from: 1,
            to: 0,
            duration: 650,
            easing: 'easeCubicIn'
        },
        fadeButtons:
        {
            from: 1,
            to: 0,
            duration: 650,
            easing: 'easeCubicIn'
        }
    }

    return (
        <AnimatedTransition transitionIns={transitionIns} transitionOuts={transitionOuts} show={match ? true : false}>
            {({ transitionValues }) => {

                const logoFrameTransition =
                {
                    clipPath: `polygon(-100% 0%, ${transitionValues['revealLogo']}% 0%, ${-100 + transitionValues['revealLogo']}% 100%, -200% 100%)`,
                    opacity: transitionValues['fadeLogo']
                };
                const logoStrokeTransition =
                {
                    strokeDashoffset: `${transitionValues['strokeLogo']}px`
                };
                const buttonsTransition =
                {
                    opacity: transitionValues['fadeButtons']
                }

                return (
                    <div className={styles.page}>
                        <VerticalAlign>
                            <div className={styles.content}>
                                <div className={styles.logoFrame} style={logoFrameTransition}>
                                    <SVGInline svg={Logo} className={styles.logo} style={logoStrokeTransition}/>
                                </div>
                                <nav className={styles.mainLinksRow} style={buttonsTransition}>
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
                                <nav className={styles.externalLinksRow} style={buttonsTransition}>
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
                            </div>
                        </VerticalAlign>
                    </div>
                );
            }}
        </AnimatedTransition>
    );
};

export default Home;