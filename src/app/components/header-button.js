import React from 'react';
import { withRouter } from 'react-router';
import LinkButton from './link-button';
import styles from '../static/styles/components/header-button.css';

function isRouteActive(path, exact)
{
    return exact ? location.pathname === path : location.pathname.startsWith(path);
}

const HeaderButton = ({ text, path, exact, color, className }) =>
{
    return (
        <div className={className}>
            <LinkButton link={path} className={`${styles.headerLinkButton} ${isRouteActive(path, exact) ? styles.activeButton : ''}`}>
                <span>{text}</span>
                <div className={`${styles.headerItemHoverBar} ${color} ${isRouteActive(path, exact) ? styles.activeHeaderItemHover : ''}`}/>
            </LinkButton>
        </div>
    );
}

export default withRouter(HeaderButton);
