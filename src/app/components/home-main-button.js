import React from 'react';
import LinkButton from './link-button';
import styles from '../static/styles/home-main-button.scss';

const HomeMainButton = ({ link, header, subtext, color }) =>
{
    return (
        <LinkButton link={link} buttonStyle={styles.linkButton}>
            <div className={styles.colorBar + ' ' + color}/>
            <h1 className={styles.header}>{header}</h1>
            <p className={styles.subtext}>{subtext}</p>
        </LinkButton>
    );
};

export default HomeMainButton;