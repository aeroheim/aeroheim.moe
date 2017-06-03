import React from 'react';
import styles from '../static/styles/components/blog-post-image.css';

import { store } from '../app';
import { addGalleryImage, setGalleryActiveImageIndex } from '../actions/blog-post-image-gallery-actions';

const BlogPostImageBlock = ({ children }) =>
{
    return <figure className={styles.imageBlock}>{children}</figure>;
}

const BlogPostImageGroup = ({ children, maxImagePerRow }) =>
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

class BlogPostImage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        store.dispatch(addGalleryImage({ 
            src: this.props.src,
            title: this.props.title,
            caption: this.props.caption,
        }));

        const index = store.getState().blogPostImageGallery.images.length - 1;
        this.onClick = () => store.dispatch(setGalleryActiveImageIndex(index));
    }

    render()
    {
        return (
            <figure tabIndex='0' className={styles.imgCell} style={this.props.style} onClick={this.onClick}>
                <img className={styles.img} src={this.props.src} alt={this.props.alt} title={this.props.title}/>
                <figcaption className={styles.imgCaptionGroup}>
                    <h3 className={styles.imgCaptionHeader}>{this.props.title}</h3>
                    <p className={styles.imgCaptionDescription}>{this.props.caption}</p>
                </figcaption>
            </figure>
        );
    }
}

export { BlogPostImageBlock, BlogPostImageGroup, BlogPostImage };
