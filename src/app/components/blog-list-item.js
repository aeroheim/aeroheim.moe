import React from 'react';
import LinkButton from './link-button';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-list-item.css';

const BlogListItem = ({ post, show, url }) =>
{
    const inTransitions =
    {
        post: styles.postInTransition,
    }

    const inStyles =
    {
        post: styles.postIn,
    }

    const outTransitions =
    {
        post: styles.postOutTransition,
    }

    const outStyles =
    {
        post: styles.postOut,
    }

    const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <li className={`${styles.post} ${transitionStyles['post']}`} onTransitionEnd={onTransitionEnd}>
                        <LinkButton link={`/blog/${post.id}`} className={styles.linkButton}>
                            <div className={styles.postColorBar}/>
                            <div className={styles.postText}>
                                <span className={styles.postTitle}>{post.title}</span>
                                <span className={styles.postDate}>{monthFormatter.format(post.date).toUpperCase()} {post.date.getDate()}<br/>{post.date.getFullYear()}</span>
                                <p className={styles.postDescription}>{post.description}</p>
                            </div>
                        </LinkButton>
                    </li>);
            }}
        </AnimatedCSSTransition>
    );
}

export default BlogListItem;