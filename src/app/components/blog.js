import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, invalidatePosts } from '../actions/blog-actions';
import RegisteredRoute from './registered-route';
import PageHeader from './page-header';
import IndexSelector from './index-selector';
import BlogListItem from './blog-list-item';
import BlogPost from './blog-post';
import Stagger from './stagger';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog.css';

class Blog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.postsRequestId = null;

        // cache props received from redux in state. this allows the component to display
        // cached values when the redux store is cleared while the component is transitioning
        // to a new set of props or unmounting.
        this.state = 
        {
            posts: null,
            loaded: false,
        };

        this.clearAndUpdatePosts = this.clearAndUpdatePosts.bind(this);
        this.clearPosts = this.clearPosts.bind(this);
    }

    componentDidMount()
    {
        if (this.props.match)
        {
            this.clearAndUpdatePosts();
        }
    }

    componentDidUpdate(prevProps)
    {
        // route match
        if (this.props.match && !prevProps.match)
        {
            this.clearAndUpdatePosts();
        }
        // route unmatch
        else if (!this.props.match && prevProps.match)
        {
            this.clearPosts();
        }
        // same route match, different query
        else if (this.props.match && prevProps.match && (this.props.location.search !== prevProps.location.search))
        {
            this.clearAndUpdatePosts();
        }
        // response received - new props
        else if (this.props.loaded && !prevProps.loaded)
        {
            // scroll to top of posts
            document.getElementById('app').scrollTo(0, 0);

            this.setState({
                posts: this.props.posts,
                page: this.props.page,
                pages: this.props.pages,
                limit: this.props.limit,
                loaded: this.props.loaded,
            });
        }
    }

    clearAndUpdatePosts()
    {
        this.clearPosts();

        this.postsRequestId = Date.now();
        this.props.fetchPosts(this.postsRequestId, this.props.location.search);
    }

    clearPosts()
    {
        this.props.invalidatePosts(this.postsRequestId);
        this.setState(prevState => {
            return {
                ...prevState,
                loaded: false,
            };
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

        return (
            <React.Fragment>
                <RegisteredRoute path='/blog/:id' children={props =>
                    <BlogPost className={this.props.className} {...props}/>
                }/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null && this.state.loaded}>
                    {({ transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={`${this.props.className} ${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                <PageHeader className={styles.header} color={styles.blogColor} show={this.props.match !== null}>BLOG</PageHeader>
                                <ul className={`${styles.posts}`}>
                                    <Stagger delay={100}>
                                        {this.state.posts.map((post) => <BlogListItem className={styles.post} key={post._id} post={post} show={this.props.match !== null && this.state.loaded}/>)}
                                    </Stagger>
                                </ul>
                                <IndexSelector className={styles.footer} 
                                    index={this.state.page} minIndex={1} maxIndex={this.state.pages} maxIndicesToDisplay={12} 
                                    url='/blog/?page={index}'/>
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
        posts: state.blog.posts !== null ? state.blog.posts : [],
        page: state.blog.page,
        pages: state.blog.pages,
        limit: state.blog.limit,
        loaded: state.blog.loaded,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        fetchPosts: (requestId, query) => dispatch(fetchPosts(requestId, query)),
        invalidatePosts: requestId => dispatch(invalidatePosts(requestId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);