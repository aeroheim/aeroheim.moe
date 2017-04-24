import React from 'react';
import LinkButton from './link-button';
import SVGInline from 'react-svg-inline';
import styles from '../static/styles/components/home-external-button.css';

const HomeExternalButton = ({ link, icon }) =>
{
    return (
        <LinkButton link={link} className={styles.externalLinkButton}>
            <SVGInline svg={icon} className={styles.linkIcon}/>
        </LinkButton>
    );
};

export default HomeExternalButton;