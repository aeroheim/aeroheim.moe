import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog-post-gallery-image.css';

const BlogPostGalleryImage = ({ src, title, caption, alt, index, imageCount, show }) => {
  const inTransitions = {
    content: new Transition(styles.contentInTransition, 'opacity'),
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

  return (
    <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
      {({ transitionStyles, onTransitionEnd }) => (
        <figure className={`${styles.content} ${transitionStyles.content}`} onTransitionEnd={onTransitionEnd}>
          <img className={styles.image} src={src} alt={alt} title={title} />
          <figcaption className={styles.captionContainer}>
            <div className={styles.imageText}>
              <h2 className={styles.imageTitle}>{title}</h2>
              <span className={styles.imageCaption}>{caption}</span>
            </div>
            <span className={styles.imageIndex}>{`${index + 1}`}&nbsp;/&nbsp;{`${imageCount}`}</span>
          </figcaption>
        </figure>
      )}
    </AnimatedCSSTransition>
  );
};

export default BlogPostGalleryImage;
