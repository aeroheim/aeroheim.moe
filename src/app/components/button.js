import React from 'react';
import styles from '../static/styles/components/button.css';

const Button = ({ className, children, onClick }) =>
{
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;