import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import VerticalAlign from './vertical-align';
import styles from '../static/styles/components/blog.css';

const Blog = ({ match }) =>
{
    const inTransitions =
    {
        content: styles.contentInTransition,
        headerOverlay: styles.headerOverlayInTransition,
        headerBackground: styles.headerBackgroundInTransition,
        posts: styles.postsInTransition,
    }

    const inStyles =
    {
        content: styles.contentIn,
        headerOverlay: styles.headerOverlayIn,
        headerBackground: styles.headerBackgroundIn,
        posts: styles.postsIn,
    }

    const outTransitions =
    {
        content: styles.contentOutTransition,
        headerOverlay: styles.headerOverlayOutTransition,
        headerBackground: styles.headerBackgroundOutTransition,
        posts: styles.postsOutTransition,
    }

    const outStyles =
    {
        content: styles.contentOut,
        headerOverlay: styles.headerOverlayOut,
        headerBackground: styles.headerBackgroundOut,
        posts: styles.postsOut,
    }

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match ? true : false}>
            {({ active, transitionStyles, onTransitionEnd }) => {
                return (
                    <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                        <div className={styles.header}>
                            <div className={`${styles.headerOverlay} ${transitionStyles['headerOverlay']}`} onTransitionEnd={onTransitionEnd}>
                                <span className={styles.headerOverlayText}>BLOG</span>
                            </div>
                            <div className={`${styles.headerBackground} ${transitionStyles['headerBackground']}`} onTransitionEnd={onTransitionEnd}/>
                        </div>
                        <ul className={`${styles.posts} ${transitionStyles['posts']}`} onTransitionEnd={onTransitionEnd}>
                            <li className={styles.post}>
                                <div className={styles.postColorBar}/>
                                <div className={styles.postText}>
                                    <span className={styles.postTitle}>TITLE</span>
                                    <span className={styles.postDate}>JAN 21<br/>2017</span>
                                    <p className={styles.postDescription}>DESCRIPTION</p>
                                </div>
                            </li>
                            <li className={styles.post}>
                            </li>
                            <li className={styles.post}>
                            </li>
                            <li className={styles.post}>
                            </li>
                            <li className={styles.post}>
                            </li>
                            <li className={styles.post}>
                            </li>
                        </ul>
                    </div>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default Blog;