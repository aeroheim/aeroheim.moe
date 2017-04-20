import React from 'react';
import styles from '../static/styles/components/vertical-align.css';

const VerticalAlign = ({ children }) =>
{
    return (
        <div className={styles.table}>
            <div className={styles.cell}>
                {children}
            </div>
        </div>
    );
}

export default VerticalAlign;