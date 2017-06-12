import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post-gallery-image.css';

const BlogPostGalleryImage = ({ show, img, index, imageCount }) =>
{
    const inTransitions =
    {
        content: styles.contentInTransition,
    }

    const inStyles =
    {
        content: styles.contentIn,
    }

    const outTransitions =
    {
        content: styles.contentOutTransition,
    }

    const outStyles =
    {
        content: styles.contentOut,
    }

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
            {({ transitionStyles, onTransitionEnd }) => {
                return (
                    <figure className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                        <img className={styles.image} src={img.src}/>
                        <figcaption className={styles.captionContainer}>
                            <div className={styles.imageText}>
                                <h2 className={styles.imageTitle}>{img.title}</h2>
                                <span className={styles.imageCaption}>{img.caption}</span>
                            </div>
                            <span className={styles.imageIndex}>{`${index + 1}/${imageCount}`}</span>
                        </figcaption>
                    </figure>
                );
            }}
        </AnimatedCSSTransition>
    );
}

export default BlogPostGalleryImage;