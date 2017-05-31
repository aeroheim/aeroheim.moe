import React from 'react';
import styles from '../static/styles/components/blog-post-image.css';

const ImageBlock = ({ children }) =>
{
    return <figure className={styles.imageBlock}>{children}</figure>;
}

const ImageGroup = ({ children, maxImagePerRow }) =>
{
    const imageMargin = 10;
    const style =
    {
        flex: `1 1 calc(${100 / maxImagePerRow}% - ${maxImagePerRow * imageMargin}px)`,
    };

    let key = 0;

    const childrenWithProps = children.map((child) => React.cloneElement(child, 
    {
        key: key++,
        style: style,
    }));

    return <figure className={styles.imageGroup}>{childrenWithProps}</figure>
}

const Image = ({ src, alt, title, caption, style }) =>
{
    return (
        <figure tabIndex='0' className={styles.imgCell} style={style}>
            <img className={styles.img} src={src} alt={alt} title={title}/>
            <figcaption className={styles.imgCaptionGroup}>
                <h3 className={styles.imgCaptionHeader}>{title}</h3>
                <p className={styles.imgCaptionDescription}>{caption}</p>
            </figcaption>
        </figure>
    );
}

export { ImageBlock, ImageGroup, Image };
