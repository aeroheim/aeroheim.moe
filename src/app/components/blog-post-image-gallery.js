import React from 'react';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

import { connect } from 'react-redux';
import { setGalleryActiveImageIndex } from '../actions/blog-post-image-gallery-actions';

class BlogPostImageGallery extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return null;
    }
}

function mapStateToProps(state)
{
    const props = state.blogPostImageGallery;
    return {
        images: props.images,
        activeImageIndex: props.activeImageIndex,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        setGalleryActiveImageIndex: (index) => dispatch(setGalleryActiveImageIndex(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostImageGallery);
