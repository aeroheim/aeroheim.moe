import React from 'react';
import { withRouter } from 'react-router';
import LinkButton from './link-button';
import Logo from '../static/img/icons/aeroheim-logo_colorized.svg';
import styles from '../static/styles/components/header.css';

class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.isRouteActive = this.isRouteActive.bind(this);
    }

    isRouteActive(path, exact)
    {
        return exact ? this.props.location.pathname === path : this.props.location.pathname.startsWith(path);
    }

    render()
    {
        const isHomeActive = this.isRouteActive('/', true);
        const isBlogActive = this.isRouteActive('/blog', false);
        const isProjectsActive = this.isRouteActive('/projects', true);
        const isAboutActive = this.isRouteActive('/about', true);
    
        return (
            <header className={`${this.props.className} ${styles.headerFlex}`}>
                <LinkButton link='/' className={`${styles.item} ${isHomeActive ? styles.activeItem : ''}`}>
                    <Logo className={styles.logo}/>
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
}

export default withRouter(Header);