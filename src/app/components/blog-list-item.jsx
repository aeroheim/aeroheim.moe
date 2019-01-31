import React from 'react';
import LinkButton from './link-button';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog-list-item.css';

const BlogListItem = ({ className, post, show }) => {
  const inTransitions = {
    content: new Transition(styles.contentInTransition, 'opacity', 'background-color', 'width'),
  };
  const inStyles = {
    content: styles.contentIn,
  };
  const outTransitions = {
    content: new Transition(styles.contentOutTransition, 'opacity'),
  };
  const outStyles = {
    content: styles.contentOut,
  };

  const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });
  let formattedDate = new Date(post.date);
  formattedDate = new Date(formattedDate.getUTCFullYear(), formattedDate.getUTCMonth(), formattedDate.getUTCDate());

  return (
    <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
      {({ transitionStyles, onTransitionEnd }) => (
        <li className={`${transitionStyles.content} ${className}`} onTransitionEnd={onTransitionEnd}>
          <LinkButton link={`/blog/${post._id}`} className={styles.link}>
            <h2 className={styles.title}>{post.title}</h2>
            <span className={styles.date}>{monthFormatter.format(formattedDate).toUpperCase()} {formattedDate.getUTCDate()}, {formattedDate.getUTCFullYear()}</span>
            <span className={styles.description}>{post.description}</span>
            <ul className={styles.tags}>
              {post.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
            </ul>
          </LinkButton>
        </li>
      )}
    </AnimatedCSSTransition>
  );
};

export default BlogListItem;
