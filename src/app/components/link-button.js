import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../static/styles/components/link-button.css';

const LinkButton = ({ link, className, children }) =>
{
    const button = 
    (
        <button className={`${styles.button} ${className}`} type="button" tabIndex="-1">
            {children}
        </button>
    );

    return new RegExp('^(?:[a-z]+:)?//', 'i').test(link)
        ? ( <a href={link}>{button}</a>)
        : ( <Link to={link}>{button}</Link>);
};

export default LinkButton;