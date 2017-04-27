import React from 'react';
import { Link } from 'react-router-dom';
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

const Home = () =>
{
    return (
        <VerticalAlign>
            <div className={styles.content}>
                <div className={styles.logoFrame}>
                    <SVGInline svg={Logo} className={styles.logo}/>
                </div>
                <nav className={styles.mainLinksRow}>
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
                <nav className={styles.externalLinksRow}>
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
    );
};

export default Home;