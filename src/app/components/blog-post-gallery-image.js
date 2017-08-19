import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog-post-gallery-image.css';

const BlogPostGalleryImage = ({ show, img, index, imageCount }) =>
{
    const inTransitions =
    {
        content: new Transition(styles.contentInTransition, 'opacity'),
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

    return (
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
            {({ transitionStyles }) => {
                return (
                    <figure className={`${styles.content} ${transitionStyles['content']}`}>
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