import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../static/styles/components/link-button.css';

const LinkButton = ({ link, buttonStyle, children }) =>
{
    var button = 
    (
        <button className={styles.button + ' ' + buttonStyle} type="button" tabIndex="-1">
            {children}
        </button>
    );

    return new RegExp('^(?:[a-z]+:)?//', 'i').test(link)
        ? ( <a href={link} className={styles.link}>{button}</a>)
        : ( <Link to={link} className={styles.link}>{button}</Link>);
};

export default LinkButton;