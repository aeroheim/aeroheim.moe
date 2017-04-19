import React from 'react';
import styles from '../static/styles/vertical-align.scss';

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