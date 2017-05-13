import React from 'react';
import HeaderButton from './header-button';
import styles from '../static/styles/components/header.css';

const Header = () =>
{
    return (
        <nav className={styles.navBar}>
            <HeaderButton text='home' exact path='/' className={styles.headerButton} color={styles.homeColor}/>
            <HeaderButton text='moonlight' exact path='/moonlight' className={styles.headerButton} color={styles.moonlightColor}/>
            <HeaderButton text='bumps' path='/bumps' className={styles.headerButton} color={styles.bumpsColor}/>
            <HeaderButton text='blog' path='/blog' className={styles.headerButton} color={styles.blogColor}/>
            <HeaderButton text='about' exact path='/about' className={styles.headerButton} color={styles.aboutColor}/>
        </nav>
    );
}

export default Header;