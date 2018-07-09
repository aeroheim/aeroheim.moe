import React from 'react';
import SVGInline from 'react-svg-inline';
import PrevIcon from '../static/img/icons/prev.svg';
import NextIcon from '../static/img/icons/next.svg';
import CloseIcon from '../static/img/icons/close.svg';
import Button from './button';
import BlogPostGalleryImage from './blog-post-gallery-image';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog-post-gallery.css';

import { connect } from 'react-redux';
import { setScrollbarEnabled } from '../actions/app-actions';
import { setGalleryActiveImageIndex, setGalleryVisibility } from '../actions/blog-post-gallery-actions';

class BlogPostGallery extends React.Component
{
    constructor(props)
    {
        super(props);
        this.onPrevImage = this.onPrevImage.bind(this);
        this.onNextImage = this.onNextImage.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps)
        {
            if (this.props.show !== nextProps.show)
            {
                this.props.setScrollbarEnabled(!this.props.show && nextProps.show ? false : true);
            }
        }
    }

    onPrevImage()
    {
        if (this.props.activeImageIndex > 0)
        {
            this.props.setGalleryActiveImageIndex(this.props.activeImageIndex - 1);
        }
    }

    onNextImage()
    {
        if (this.props.activeImageIndex + 1 < this.props.images.length)
        {
            this.props.setGalleryActiveImageIndex(this.props.activeImageIndex + 1);
        }
    }

    onClose()
    {
        this.props.setGalleryVisibility(false);
    }

    render()
    {
        const inTransitions =
        {
            page: new Transition(styles.pageInTransition, 'opacity'),
        }

        const inStyles =
        {
            page: styles.pageIn,
        }

        const outTransitions =
        {
            page: new Transition(styles.pageOutTransition, 'opacity'),
        }

        const outStyles =
        {
            page: styles.pageOut,
        }

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.show}>
                {({ transitionStyles }) => {
                    return (
                        <div className={`${styles.page} ${transitionStyles['page']}`}>
                            <div className={styles.closeButtonContainer}>
                                <Button className={styles.button} onClick={this.onClose}>
                                    <SVGInline svg={CloseIcon} className={styles.closeIcon}/>
                                </Button>
                            </div>
                            <div className={styles.navButtonContainer}>
                                <Button className={styles.button} animate show={this.props.activeImageIndex > 0} onClick={this.onPrevImage}>
                                    <SVGInline svg={PrevIcon} className={styles.navIcon}/>
                                </Button>
                            </div>
                            <div className={styles.content}>
                                {this.props.images.map((image, index) => <BlogPostGalleryImage key={index} img={image} index={index} imageCount={this.props.images.length} show={index === this.props.activeImageIndex}/>)}
                            </div>
                            <div className={styles.navButtonContainer}>
                                <Button className={styles.button} animate show={this.props.activeImageIndex < this.props.images.length - 1} onClick={this.onNextImage}>
                                    <SVGInline svg={NextIcon} className={styles.navIcon}/>
                                </Button>
                            </div>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        )
    }
}

function mapStateToProps(state)
{
    const props = state.BlogPostGallery;
    return {
        images: props.images,
        activeImageIndex: props.activeImageIndex,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        setScrollbarEnabled: (enabled) => dispatch(setScrollbarEnabled(enabled)),
        setGalleryActiveImageIndex: (index) => dispatch(setGalleryActiveImageIndex(index)),
        setGalleryVisibility: (enabled) => dispatch(setGalleryVisibility(enabled)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostGallery);