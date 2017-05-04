import React from 'react';
import AnimatedTransition from './animated-transition';
import styles from '../static/styles/components/blog.css';

const Blog = ({ match }) =>
{
    const transitionIns = 
    {
        revealFrame: 
        {
            from: 0,
            to: 115,
            duration: 850,
            delay: 500,
            easing: 'easeExpOut'
        },
        revealPage:
        {
            from: 0,
            to: 115,
            duration: 850,
            delay: 500,
            easing: 'easeCubicOut'
        }
    }

    const transitionOuts = 
    {
        revealFrame:
        {
            from: 115,
            to: 0,
            duration: 650,
            easing: 'easeCubicOut'
        },
        revealPage:
        {
            from: 115,
            to: 0,
            duration: 650,
            easing: 'easeCubicOut'
        },
    }

    return (
        <AnimatedTransition transitionIns={transitionIns} transitionOuts={transitionOuts} show={match ? true : false}>
            {({ transitionValues }) => {

                const frameTransition = 
                {
                    clipPath: `polygon(-15% 0%, ${transitionValues['revealFrame']}% 0%, ${-15 + transitionValues['revealFrame']}% 100%, -30% 100%)`
                };

                const pageTransition = 
                {
                    clipPath: `polygon(-15% 0%, ${transitionValues['revealPage']}% 0%, ${-15 + transitionValues['revealPage']}% 100%, -30% 100%)`
                };

                return (
                    <div className={styles.frame} style={frameTransition}>
                        <div className={styles.page} style={pageTransition}>
                            <h1>Blog</h1>
                        </div>
                    </div>
                );
            }}
        </AnimatedTransition>
    );
}

export default Blog;