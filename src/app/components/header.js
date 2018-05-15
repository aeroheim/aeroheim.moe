import React from 'react';
import { withRouter } from 'react-router';
import LinkButton from './link-button';
import SVGInline from 'react-svg-inline';
import Logo from '../static/img/icons/logo-path.svg';
import styles from '../static/styles/components/header.css';

function isRouteActive(path, exact)
{
    return exact ? location.pathname === path : location.pathname.startsWith(path);
}

const Header = () =>
{
    const isHomeActive = isRouteActive('/', true);
    const isBlogActive = isRouteActive('/blog', false);
    const isProjectsActive = isRouteActive('/projects', true);
    const isAboutActive = isRouteActive('/about', true);

    return (
        <header className={styles.headerFlex}>
            <LinkButton link='/' className={`${styles.item} ${isHomeActive ? styles.activeItem : ''}`}>
                <SVGInline svg={Logo} className={styles.logo}/>
            </LinkButton>
            <LinkButton link='/blog' className={`${styles.textItem} ${styles.item} ${isBlogActive ? styles.activeItem : ''}`}>
                blog
                <div className={`${styles.textItemUnderline} ${styles.blogColor} ${isBlogActive ? styles.activeTextItemUnderline : ''}`}/>
            </LinkButton>
            <LinkButton link='/projects' className={`${styles.textItem} ${styles.item} ${isProjectsActive ? styles.activeItem : ''}`}>
                projects
                <div className={`${styles.textItemUnderline} ${styles.projectsColor} ${isProjectsActive ? styles.activeTextItemUnderline : ''}`}/>
            </LinkButton>
            <LinkButton link='/about' className={`${styles.textItem} ${styles.item} ${isAboutActive ? styles.activeItem : ''}`}>
                about
                <div className={`${styles.textItemUnderline} ${styles.aboutColor} ${isAboutActive ? styles.activeTextItemUnderline : ''}`}/>
            </LinkButton>
        </header>
    );
}

export default withRouter(Header);