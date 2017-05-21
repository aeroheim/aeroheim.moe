import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../static/styles/components/link-button.css';

const LinkButton = ({ link, className, children }) =>
{
    return new RegExp('^(?:[a-z]+:)?//', 'i').test(link)
        ? ( 
            <a className={styles.link} href={link}>
                <div className={className}>
                    {children}
                </div>
            </a>
        )
        : ( 
            <Link className={styles.link} to={link}>
                <div className={className}>
                    {children}
                </div>
            </Link>
        );
}

export default LinkButton;