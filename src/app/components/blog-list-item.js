import React from 'react';
import LinkButton from './link-button';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-list-item.css';

const BlogListItem = ({ post, show, url }) =>
{
    post.date = new Date(post.date);
    const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });

    return (
        <li className={styles.post}>
            <LinkButton link={url ? url : `/blog/${post._id}`} className={styles.linkButton}>
                <div className={styles.postColorBar}/>
                <div className={styles.postText}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <span className={styles.postDate}>{monthFormatter.format(post.date).toUpperCase()} {post.date.getDate()}<br/>{post.date.getFullYear()}</span>
                </div>
                <p className={styles.postDescription}>{post.description}</p>
                <ul className={styles.tagList}>
                    {post.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
                </ul>
            </LinkButton>
        </li>);
}

export default BlogListItem;