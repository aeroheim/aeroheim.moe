import React from 'react';
import { Link } from 'react-router-dom';
import LinkButton from '../components/link-button';
import HomeMainButton from '../components/home-main-button';
import VerticalAlign from '../components/vertical-align';
import SVGInline from 'react-svg-inline';
import Logo from '../static/img/icons/aeroheim.svg';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import styles from '../static/styles/views/home.css';

const Home = () =>
{
    return (
        <VerticalAlign>
            <div className={styles.content}>
                <div className={styles.logoFrame}>
                    <SVGInline svg={Logo} className={styles.logo}/>
                </div>
                <div className={styles.mainLinksRow}>
                    <div className={styles.link}>
                        <HomeMainButton link="/moonlight" header="moonlight" subtext="aesthetic music player" color={styles.moonlightColor}/>
                    </div>
                    <div className={styles.link}>
                        <HomeMainButton link="/bumps" header="bumps" subtext="favorite beats with art" color={styles.bumpsColor}/>
                    </div>
                    <div className={styles.link}>
                        <HomeMainButton link="/blog" header="blog" subtext="thoughts and reflections" color={styles.blogColor}/>
                    </div>
                </div>
                <div className={styles.externalLinksRow}>
                    <div className={styles.externalLink}>
                        <LinkButton link="https://github.com/aeroheim" buttonStyle={styles.externalLinkButton}>
                            <SVGInline svg={GithubIcon} className={styles.linkIcon}/>
                        </LinkButton>
                    </div>
                    <div className={styles.externalLink}>
                        <LinkButton link="https://twitter.com/aeroheim" buttonStyle={styles.externalLinkButton}>
                            <SVGInline svg={TwitterIcon} className={styles.linkIcon}/>
                        </LinkButton>
                    </div>
                    <div className={styles.externalLink}>
                        <LinkButton link="https://www.linkedin.com/in/benjamin-pang-45621290" buttonStyle={styles.externalLinkButton}>
                            <SVGInline svg={LinkedInIcon} className={styles.linkIcon}/>
                        </LinkButton>
                    </div>
                </div>
            </div>
        </VerticalAlign>
    );
};

export default Home;