import React from 'react';
import LinkButton from './link-button';
import styles from '../static/styles/components/home-external-button.css';

const HomeExternalButton = ({ Icon, link, className }) =>
{
    return (
        <div className={className}>
            <LinkButton link={link} className={styles.externalLinkButton}>
                <Icon className={styles.linkIcon}/>
            </LinkButton>
        </div>
    );
};

export default HomeExternalButton;