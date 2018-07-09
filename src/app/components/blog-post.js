import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, invalidatePost } from '../actions/blog-post-actions';
import { setGalleryImages, setGalleryActiveImageIndex, setGalleryVisibility } from '../actions/blog-post-gallery-actions';
import LinkButton from './link-button';
import BlogPostGallery from './blog-post-gallery';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        if (this.props.match !== null)
        {
            this.props.fetchPost(this.props.match.params.id);
            this.props.setGalleryImages([]);
            this.props.setGalleryActiveImageIndex(-1);
            this.props.setGalleryVisibility(false);
        }
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.match !== null && prevProps.match === null)
        {
            this.props.fetchPost(this.props.match.params.id);
            this.props.setGalleryImages([]);
            this.props.setGalleryActiveImageIndex(-1);
            this.props.setGalleryVisibility(false);
        }
        else if (this.props.match === null && prevProps.match !== null)
        {
            this.props.invalidatePost();
        }
    }

    render()
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

        const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });
        const match = this.props.match !== null;
        const err = this.props.err !== null;

        return (
            <React.Fragment>
                <BlogPostGallery show={match && this.props.loaded && this.props.showImageGallery}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match && this.props.loaded}>
                    {({ transitionStyles }) => {
                        return (
                            <div className={`${styles.className} ${styles.content} ${transitionStyles['content']}`}>
                                <LinkButton link='/blog' className={styles.linkButton}>
                                    <div className={styles.postColorBar}/>
                                    <div className={styles.postText}>
                                        <span className={styles.postTitle}>{this.props.title}</span>
                                        <span className={styles.postDate}>{monthFormatter.format(this.props.date).toUpperCase()} {this.props.date.getUTCDate()}<br/>{this.props.date.getUTCFullYear()}</span>
                                    </div>
                                    <p className={styles.postDescription}>{this.props.description}</p>
                                    <ul className={styles.tagList}>
                                        {this.props.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
                                    </ul>
                                </LinkButton>
                                <article className={styles.post}>
                                    {this.props.content}
                                </article>
                            </div>
                        );
                    }}
                </AnimatedCSSTransition>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state)
{
    const props = state.blogPost;
    return {
        title: props.title,
        description: props.description,
        date: props.date,
        tags: props.tags,
        content: props.content,
        loaded: props.loaded,
        err: props.err,
        showImageGallery: state.BlogPostGallery.visible,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        fetchPost: (id) => dispatch(fetchPost(id)),
        invalidatePost: () => dispatch(invalidatePost()),
        setGalleryImages: (images) => dispatch(setGalleryImages(images)),
        setGalleryActiveImageIndex: (index) => dispatch(setGalleryActiveImageIndex(index)),
        setGalleryVisibility: (visible) => dispatch(setGalleryVisibility(visible)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);