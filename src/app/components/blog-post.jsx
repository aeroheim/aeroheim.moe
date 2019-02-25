import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, invalidatePost } from '../actions/blog-post-actions';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import LinkButton from './link-button';
import BlogPostGallery from './blog-post-gallery';
import PrevIcon from '../static/img/icons/prev.svg';
import NextIcon from '../static/img/icons/next.svg';
import styles from '../static/styles/components/blog-post.css';

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.postRequestId = null;
    this.postsRequestId = null;

    // cache props received from redux in state. this allows the component to display
    // cached values when the redux store is cleared while the component is transitioning
    // to a new set of props or unmounting.
    this.state = {
      title: null,
      description: null,
      date: null,
      tags: null,
      content: null,
      images: [],
      galleryIndex: -1,
      galleryVisible: false,
      prevPost: null,
      nextPost: null,
      loaded: false,
    };

    this.clearAndUpdatePost = this.clearAndUpdatePost.bind(this);
    this.clearPost = this.clearPost.bind(this);
    this.viewGallery = this.viewGallery.bind(this);
    this.closeGallery = this.closeGallery.bind(this);

    if (props.match) {
      this.clearAndUpdatePost();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match && !prevProps.match) {
      // route match
      this.clearAndUpdatePost();
    } else if (!this.props.match && prevProps.match) {
      // route unmatch
      this.clearPost();
    } else if (this.props.match && prevProps.match
            && (this.props.match.params.id !== prevProps.match.params.id || this.props.location.search !== prevProps.location.search)) {
      // same route match, different params/query
      this.clearAndUpdatePost();
    } else if (this.props.loaded && !prevProps.loaded) {
      // response received - new props
      if (typeof window !== 'undefined') {
        document.getElementById('app').scrollTo(0, 0);
      }

      this.setState({
        title: this.props.title,
        description: this.props.description,
        date: this.props.date,
        tags: this.props.tags,
        content: this.props.content,
        images: this.props.images,
        galleryIndex: -1,
        galleryVisible: false,
        prevPost: this.props.prevPost,
        nextPost: this.props.nextPost,
        limit: this.props.limit,
        page: this.props.page,
        loaded: true,
      });
    }
  }

  componentWillUnmount() {
    this.clearPost();
  }

  clearAndUpdatePost() {
    this.clearPost();
    this.postRequestId = this.postsRequestId;
    this.props.fetchPost(this.postRequestId, this.props.match.params.id, this.props.location.search, { viewGallery: this.viewGallery });
  }

  clearPost() {
    this.props.invalidatePost(this.postRequestId);
    this.setState(prevState => ({
      ...prevState,
      loaded: false,
    }));
  }

  viewGallery(index) {
    this.setState(prevState => ({
      ...prevState,
      galleryIndex: index,
      galleryVisible: true,
    }));
  }

  closeGallery() {
    this.setState(prevState => ({
      ...prevState,
      galleryVisible: false,
    }));
  }

  render() {
    const inTransitions = {
      content: new Transition(styles.contentInTransition, 'opacity'),
    };
    const inStyles = {
      content: styles.contentIn,
    };
    const outTransitions = {
      content: new Transition(styles.contentOutTransition, 'opacity'),
    };
    const outStyles = {
      content: styles.contentOut,
    };

    const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });

    return (
      <React.Fragment>
        <BlogPostGallery images={this.state.images} index={this.state.galleryIndex} onIndex={this.viewGallery} onClose={this.closeGallery} show={this.props.match !== null && this.state.loaded && this.state.galleryVisible} />
        <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null && this.state.loaded}>
          {({ transitionStyles, onTransitionEnd }) => (
            <div className={`${this.props.className} ${styles.content} ${transitionStyles.content}`} onTransitionEnd={onTransitionEnd}>
              <header>
                <LinkButton link={`/blog/?page=${this.state.page}`} className={styles.header}>
                  <h2 className={styles.backButton}>
                    <NextIcon className={styles.backButtonIcon} />
                    back to blog
                  </h2>
                  <h2 className={styles.title}>{this.state.title}</h2>
                  <span className={styles.date}>{monthFormatter.format(this.state.date).toUpperCase()} {this.state.date.getUTCDate()}, {this.state.date.getUTCFullYear()}</span>
                  <span className={styles.description}>{this.state.description}</span>
                  <ul className={styles.tags}>
                    {this.state.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                  </ul>
                </LinkButton>
              </header>
              <article className={styles.post}>
                {this.state.content}
              </article>
              <footer className={styles.footer}>
                <LinkButton link={this.state.prevPost ? `/blog/${this.state.prevPost._id}` : `/blog/?page=${this.state.page}`} className={styles.prevButton}>
                  <PrevIcon className={styles.footerButtonIcon} />
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
                  <NextIcon className={styles.footerButtonIcon} />
                </LinkButton>
              </footer>
            </div>
          )}
        </AnimatedCSSTransition>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.blogPost.title,
    description: state.blogPost.description,
    date: state.blogPost.date,
    tags: state.blogPost.tags,
    content: state.blogPost.content,
    images: state.blogPost.images,
    prevPost: state.blogPost.prevPost,
    nextPost: state.blogPost.nextPost,
    showImageGallery: state.blogPostGallery.visible,
    limit: state.blogPost.limit,
    page: state.blogPost.page,
    loaded: state.blogPost.loaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (requestId, postId, query, markdownProps) => dispatch(fetchPost(requestId, postId, query, markdownProps)),
    invalidatePost: requestId => dispatch(invalidatePost(requestId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
