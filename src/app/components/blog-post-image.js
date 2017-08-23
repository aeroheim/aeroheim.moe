import React from 'react';
import store from '../app';
import { addGalleryImage, setGalleryActiveImageIndex, setGalleryVisibility } from '../actions/blog-post-gallery-actions';
import styles from '../static/styles/components/blog-post-image.css';

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
        this.index = -1;
        this.showGallery = this.showGallery.bind(this);
    }

    componentWillMount()
    {
        store.dispatch(addGalleryImage({ 
            src: this.props.src,
            title: this.props.title,
            caption: this.props.caption,
        }));

        this.index = store.getState().BlogPostGallery.images.length - 1;
    }

    showGallery()
    {
        store.dispatch(setGalleryActiveImageIndex(this.index));
        store.dispatch(setGalleryVisibility(true));
    }

    render()
    {
        return (
            <figure tabIndex='0' className={styles.imgCell} style={this.props.style} onClick={this.showGallery}>
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
