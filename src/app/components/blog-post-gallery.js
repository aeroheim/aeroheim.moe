import React from 'react';
import Button from './button';
import SVGInline from 'react-svg-inline';
import PrevIcon from '../static/img/icons/prev.svg';
import NextIcon from '../static/img/icons/next.svg';
import CloseIcon from '../static/img/icons/close.svg';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post-gallery.css';

import { connect } from 'react-redux';
import { setScrollbarVisibility } from '../actions/app-actions';
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
                this.props.setScrollbarVisibility(!this.props.show && nextProps.show ? false : true);
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
            page: styles.pageInTransition,
        }

        const inStyles =
        {
            page: styles.pageIn,
        }

        const outTransitions =
        {
            page: styles.pageOutTransition,
        }

        const outStyles =
        {
            page: styles.pageOut,
        }

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.show}>
                {({ transitionStyles, onTransitionEnd }) => {
                    return (
                        <div className={`${styles.page} ${transitionStyles['page']}`} onTransitionEnd={onTransitionEnd}>
                            <div className={styles.closeButtonContainer}>
                                <Button onClick={this.onClose}>
                                    <SVGInline svg={CloseIcon} className={styles.closeIcon}/>
                                </Button>
                            </div>
                            <div className={styles.navButtonContainer}>
                                <Button animate show={this.props.activeImageIndex > 0} onClick={this.onPrevImage}>
                                    <SVGInline svg={PrevIcon} className={styles.navIcon}/>
                                </Button>
                            </div>
                            <div className={styles.content} onTransitionEnd={onTransitionEnd}>
                                <img className={styles.image} src={this.props.images[this.props.activeImageIndex].src}/>
                                <div>
                                    <div className={styles.imageColorBar}/>
                                    <div className={styles.imageText}>
                                        <span className={styles.imageTitle}>{this.props.title}</span>
                                        <span className={styles.imageIndex}>{`${this.props.activeImageIndex}/${this.props.images.length}`}</span>
                                    </div>
                                    <p className={styles.imageCaption}>{this.props.caption}</p>
                                </div>
                            </div>
                            <div className={styles.navButtonContainer}>
                                <Button animate show={this.props.activeImageIndex < this.props.images.length - 1} onClick={this.onNextImage}>
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
        setScrollbarVisibility: (visible) => dispatch(setScrollbarVisibility(visible)),
        setGalleryActiveImageIndex: (index) => dispatch(setGalleryActiveImageIndex(index)),
        setGalleryVisibility: (visible) => dispatch(setGalleryVisibility(visible)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostGallery);
