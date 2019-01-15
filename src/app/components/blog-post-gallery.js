import React from 'react';
import { connect } from 'react-redux';
import { setScrollbarEnabled } from '../actions/app-actions';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import Button from './button';
import BlogPostGalleryImage from './blog-post-gallery-image';
import PrevIcon from '../static/img/icons/prev.svg';
import NextIcon from '../static/img/icons/next.svg';
import CloseIcon from '../static/img/icons/close.svg';
import styles from '../static/styles/components/blog-post-gallery.css';

class BlogPostGallery extends React.Component
{
    constructor(props)
    {
        super(props);
        this.onPrevImage = this.onPrevImage.bind(this);
        this.onNextImage = this.onNextImage.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.show !== this.props.show)
        {
            this.props.setScrollbarEnabled(this.props.show && !prevProps.show ? false : true);
        }
    }

    onPrevImage()
    {
        if (this.props.index > 0)
        {
            this.props.onIndex(this.props.index - 1);
        }
    }

    onNextImage()
    {
        if (this.props.index + 1 < this.props.images.length)
        {
            this.props.onIndex(this.props.index + 1);
        }
    }

    onClose()
    {
        this.props.setScrollbarEnabled(false);
        this.props.onClose();
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
                {({ transitionStyles, onTransitionEnd }) => {
                    return (
                        <div className={`${styles.page} ${transitionStyles['page']}`} onTransitionEnd={onTransitionEnd}>
                            <Button className={`${styles.button} ${styles.closeButton}`} onClick={this.onClose}>
                                <CloseIcon/>
                            </Button>
                            <Button className={`${styles.button} ${styles.navButton}`} onClick={this.onPrevImage}>
                                <PrevIcon/>
                            </Button>
                            <div className={styles.content}>
                                {this.props.images.map(image => <BlogPostGalleryImage {...image} key={image.index} imageCount={this.props.images.length} show={image.index === this.props.index}/>)}
                            </div>
                            <Button className={`${styles.button} ${styles.navButton}`} onClick={this.onNextImage}>
                                <NextIcon/>
                            </Button>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        setScrollbarEnabled: enabled => dispatch(setScrollbarEnabled(enabled)),
    };
}

export default connect(null, mapDispatchToProps)(BlogPostGallery);