import React from 'react';
import styles from '../static/styles/components/blog-post-image.css';

const ImageBlock = ({ children }) =>
{
    return <div className={styles.imageBlock}>{children}</div>;
}

const ImageGroup = ({ children, maxImagePerRow }) =>
{
    const imageMargin = 10;
    const style =
    {
        flex: `1 1 calc(${100 / maxImagePerRow}% - ${maxImagePerRow * imageMargin}px)`,
    };

    const childrenWithProps = children.map((child) => React.cloneElement(child, 
    {
        style: style,
    }));

    return <div className={styles.imageGroup}>{childrenWithProps}</div>
}

const Image = ({ src, alt, title, style }) =>
{
    console.log(style);
    return <img className={styles.img} style={style} src={src} alt={alt} title={title}/>;
}

export { ImageBlock, ImageGroup, Image };
