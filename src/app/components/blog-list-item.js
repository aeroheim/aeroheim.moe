import React from 'react';
import LinkButton from './link-button';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-list-item.css';

const BlogListItem = ({ post, show, url }) =>
{
    var date = new Date(post.date);
    post.date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });

    return (
        <li className={styles.post}>
            <LinkButton link={url ? url : `/blog/${post._id}`} className={styles.linkButton}>
                <div className={styles.postColorBar}/>
                <div className={styles.postText}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <span className={styles.postDate}>{monthFormatter.format(post.date).toUpperCase()} {post.date.getUTCDate()}<br/>{post.date.getUTCFullYear()}</span>
                </div>
                <p className={styles.postDescription}>{post.description}</p>
                <ul className={styles.tagList}>
                    {post.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
                </ul>
            </LinkButton>
        </li>);
}

export default BlogListItem;