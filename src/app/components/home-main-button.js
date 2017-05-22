import React from 'react';
import LinkButton from './link-button';
import styles from '../static/styles/components/home-main-button.css';

const HomeMainButton = ({ link, header, subtext, color, className }) =>
{
    return (
        <div className={className}>
            <LinkButton link={link} className={styles.linkButton}>
                <div className={`${styles.colorBar} ${color}`}/>
                <div className={`${styles.colorBarHover} ${color}`}/>
                <h2 className={styles.header}>{header}</h2>
                <p className={styles.subtext}>{subtext}</p>
            </LinkButton>
        </div>
    );
};

export default HomeMainButton;