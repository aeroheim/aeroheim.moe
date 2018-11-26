import React from 'react';
import LinkButton from './link-button';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog-list-item.css';

const BlogListItem = ({ className, post, show, url }) =>
{
    const inTransitions =
    {
        content: new Transition(styles.contentInTransition, 'opacity', 'background-color', 'width'),
    }

    const inStyles =
    {
        content: styles.contentIn,
    }

    const outTransitions =
    {
        content: new Transition(styles.contentOutTransition, 'opacity'),
    }

    const outStyles =
    {
        content: styles.contentOut,
    }

    var date = new Date(post.date);
    post.date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <li className={`${transitionStyles['content']} ${className}`} onTransitionEnd={onTransitionEnd}>
                        <LinkButton link={url ? url : `/blog/${post._id}`} className={styles.link}>
                            <h2 className={styles.title}>{post.title}</h2>
                            <span className={styles.date}>{monthFormatter.format(post.date).toUpperCase()} {post.date.getUTCDate()}, {post.date.getUTCFullYear()}</span>
                            <span className={styles.description}>{post.description}</span>
                            <ul className={styles.tags}>
                                {post.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
                            </ul>
                        </LinkButton>
                    </li>
                );
            }}
        </AnimatedCSSTransition>);
}

export default BlogListItem;