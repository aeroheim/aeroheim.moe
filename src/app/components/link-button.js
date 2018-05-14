import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../static/styles/components/link-button.css';

const LinkButton = ({ link, className, children }) =>
{
    return new RegExp('^(?:[a-z]+:)?//', 'i').test(link)
        ? ( 
            <a className={`${styles.link} ${className}`} href={link}>
                {children}
            </a>
        )
        : ( 
            <Link className={`${styles.link} ${className}`} to={link}>
                {children}
            </Link>
        );
}

export default LinkButton;