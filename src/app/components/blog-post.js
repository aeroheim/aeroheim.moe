import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, invalidatePost } from '../actions/blog-post-actions';
import { setGalleryImages, setGalleryActiveImageIndex, setGalleryVisibility } from '../actions/blog-post-gallery-actions';
import PrevIcon from '../static/img/icons/prev.svg';
import NextIcon from '../static/img/icons/next.svg';
import LinkButton from './link-button';
import BlogPostGallery from './blog-post-gallery';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
        this.postStateId = null;
        this.postsStateId = null;

        // cache props received from redux in state. this allows the component to display
        // cached values when the redux store is cleared while the component is transitioning
        // to a new set of props or unmounting.
        this.state = 
        {
            title: null,
            description: null,
            date: null,
            tags: null,
            content: null,
            prevPost: null,
            nextPost: null,
            loaded: false,
        };

        this.clearAndUpdatePost = this.clearAndUpdatePost.bind(this);
        this.clearPost = this.clearPost.bind(this);
    }

    componentDidMount()
    {
        if (this.props.match)
        {
            this.clearAndUpdatePost();
        }
    }

    componentWillUnmount()
    {
        this.clearPost();
    }

    componentDidUpdate(prevProps)
    {
        // route match
        if (this.props.match && !prevProps.match)
        {
            this.clearAndUpdatePost();
        }
        // route unmatch
        else if (!this.props.match && prevProps.match)
        {
            this.clearPost();
        }
        // same route match, different params/query
        else if (this.props.match && prevProps.match 
            && (this.props.match.params.id !== prevProps.match.params.id || this.props.location.search !== prevProps.location.search))
        {
            this.clearAndUpdatePost();
        }
        // response received - new props
        else if (this.props.loaded && !prevProps.loaded)
        {
            // scroll to top of new post
            document.getElementById('app').scrollTo(0, 0);
            this.setState(
            {
                title: this.props.title,
                description: this.props.description,
                date: this.props.date,
                tags: this.props.tags,
                content: this.props.content,
                prevPost: this.props.prevPost,
                nextPost: this.props.nextPost,
                limit: this.props.limit,
                page: this.props.page,
                loaded: true,
            });
        }
    }

    clearAndUpdatePost()
    {
        this.clearPost();

        this.postStateId = this.postsStateId;
        this.props.fetchPost(this.postStateId, this.props.match.params.id, this.props.location.search);

        this.props.setGalleryImages([]);
        this.props.setGalleryActiveImageIndex(-1);
        this.props.setGalleryVisibility(false);
    }

    clearPost()
    {
        this.props.invalidatePost(this.postStateId);
        this.setState((prevState, props) =>
        {
            return Object.assign(prevState, { loaded: false });
        });
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

        return (
            <React.Fragment>
                <BlogPostGallery show={this.props.match !== null && this.state.loaded && this.props.showImageGallery}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null && this.state.loaded}>
                    {({ transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={`${this.props.className} ${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                <header>
                                    <LinkButton link={`/blog/?page=${this.state.page}`} className={styles.header}>
                                        <h2 className={styles.backButton}>
                                            <NextIcon className={styles.backButtonIcon}/>
                                            back to blog
                                        </h2>
                                        <h2 className={styles.title}>{this.state.title}</h2>
                                        <span className={styles.date}>{monthFormatter.format(this.state.date).toUpperCase()} {this.state.date.getUTCDate()}, {this.state.date.getUTCFullYear()}</span>
                                        <span className={styles.description}>{this.state.description}</span>
                                        <ul className={styles.tags}>
                                            {this.state.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
                                        </ul>
                                    </LinkButton>
                                </header>
                                <article className={styles.post}>
                                    {this.state.content}
                                </article>
                                <footer className={styles.footer}>
                                    <LinkButton link={this.state.prevPost ? `/blog/${this.state.prevPost._id}` : `/blog/?page=${this.state.page}`} className={styles.prevButton}>
                                        <PrevIcon className={styles.footerButtonIcon}/>
                                        <div className={styles.prevButtonText}>
                                            <span>prev post</span>
                                            <h2>{this.state.prevPost ? this.state.prevPost.title : 'back to blog'}</h2>
                                        </div>
                                    </LinkButton>
                                    <LinkButton link={this.state.nextPost ? `/blog/${this.state.nextPost._id}` : `/blog/?page=${this.state.page}`} className={styles.nextButton}>
                                        <div className={styles.nextButtonText}>
                                            <span>next post</span>
                                            <h2>{this.state.nextPost ? this.state.nextPost.title : 'back to blog'}</h2>
                                        </div>
                                        <NextIcon className={styles.footerButtonIcon}/>
                                    </LinkButton>
                                </footer>
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
    return {
        title: state.blogPost.title,
        description: state.blogPost.description,
        date: state.blogPost.date,
        tags: state.blogPost.tags,
        content: state.blogPost.content,
        prevPost: state.blogPost.prevPost,
        nextPost: state.blogPost.nextPost,
        showImageGallery: state.BlogPostGallery.visible,
        limit: state.blogPost.limit,
        page: state.blogPost.page,
        loaded: state.blogPost.loaded,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        fetchPost: (stateId, postId, query) => dispatch(fetchPost(stateId, postId, query)),
        invalidatePost: (stateId) => dispatch(invalidatePost(stateId)),
        setGalleryImages: (images) => dispatch(setGalleryImages(images)),
        setGalleryActiveImageIndex: (index) => dispatch(setGalleryActiveImageIndex(index)),
        setGalleryVisibility: (visible) => dispatch(setGalleryVisibility(visible)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);