import React from 'react';
import LinkButton from './link-button';
import SVGInline from 'react-svg-inline';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import styles from '../static/styles/components/footer.css';

const Footer = () =>
{
    return (
        <footer className={styles.footerFlex}>
            <nav className={styles.linksFlex}>
                <LinkButton link='https://github.com/aeroheim' className={styles.link}>
                    <SVGInline svg={GithubIcon} className={styles.linkIcon}/>
                </LinkButton>
                <LinkButton link='https://twitter.com/aeroheim' className={styles.link}>
                    <SVGInline svg={TwitterIcon} className={styles.linkIcon}/>
                </LinkButton>
                <LinkButton link='https://www.linkedin.com/in/benjamin-pang-45621290' className={styles.link}>
                    <SVGInline svg={LinkedInIcon} className={styles.linkIcon}/>
                </LinkButton>
            </nav>
            <span className={styles.text}>© aeroheim - made with react</span>
        </footer>
    )
};

export default Footer;