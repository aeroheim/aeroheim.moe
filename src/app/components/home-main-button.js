import React from 'react';
import LinkButton from './link-button';
import styles from '../static/styles/components/home-main-button.css';

const HomeMainButton = ({ link, header, subtext, color }) =>
{
    return (
        <LinkButton link={link} className={styles.linkButton}>
            <div className={`${styles.colorBar} ${color}`}/>
            <div className={`${styles.colorBarTransition} ${color}`}/>
            <h1 className={styles.header}>{header}</h1>
            <p className={styles.subtext}>{subtext}</p>
        </LinkButton>
    );
};

export default HomeMainButton;