import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, invalidatePosts } from '../actions/blog-actions';
import RouteContent from './route-content';
import PageHeader from './page-header';
import BlogListItem from './blog-list-item';
import BlogPost from './blog-post';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog.css';

class Blog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.blogPostPath = `${props.path}/:id`;
        this.postsStateId = null;

        // cache props received from redux in state. this allows the component to display
        // cached values when the redux store is cleared while the component is transitioning
        // to a new set of props or unmounting.
        this.state = 
        {
            posts: null,
            loaded: false,
        };

        this.clearAndUpdatePosts.bind(this);
        this.clearPosts.bind(this);
    }

    componentDidMount()
    {
        if (this.props.match && this.props.match.isExact)
        {
            this.clearAndUpdatePosts();
        }
    }

    componentDidUpdate(prevProps)
    {
        const match = this.props.match && this.props.match.isExact;
        const prevMatch = prevProps.match && prevProps.match.isExact;

        // route match
        if (match && !prevMatch)
        {
            this.clearAndUpdatePosts();
        }
        // route unmatch
        else if (!match && prevMatch)
        {
            this.clearPosts();
        }
        // response received - new props
        else if (this.props.loaded && !prevProps.loaded)
        {
            this.setState({
                posts: this.props.posts,
                loaded: this.props.loaded,
            });
        }
    }

    clearAndUpdatePosts()
    {
        this.clearPosts();

        this.postsStateId = Date.now();
        this.props.fetchPosts(this.postsStateId);
    }

    clearPosts()
    {
        this.props.invalidatePosts(this.postsStateId);
        this.setState((prevState, props) =>
        {
            return Object.assign(prevState, { loaded: false });
        });
    }

    render()
    {
        const inTransitions =
        {
            content: new Transition(styles.contentInTransition, 'left'),
            posts: new Transition(styles.postsInTransition, 'opacity', 'clip-path'),
        }

        const inStyles =
        {
            content: styles.contentIn,
            posts: styles.postsIn,
        }

        const outTransitions =
        {
            content: new Transition(styles.contentOutTransition, 'opacity'),
            posts: new Transition(styles.postsOutTransition, 'opacity'),
        }

        const outStyles =
        {
            content: styles.contentOut,
            posts: styles.postsOut,
        }

        const match = this.props.match && this.props.match.isExact;
        return (
            <React.Fragment>
                <Route path={this.blogPostPath} children={(props) =>
                    <RouteContent path={this.blogPostPath} {...props}>
                        <BlogPost className={this.props.className}/>
                    </RouteContent>}
                />
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match && this.state.loaded}>
                    {({ transitionStyles }) => {
                        return (
                            <div className={`${this.props.className} ${styles.content} ${transitionStyles['content']}`}>
                                <PageHeader className={styles.header} color={styles.blogColor} show={match}>BLOG</PageHeader>
                                <ul className={`${styles.posts} ${transitionStyles['posts']}`}>
                                    {this.state.posts.map((post) => <BlogListItem className={styles.post} key={post._id} post={post} show={match}/>)}
                                </ul>
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
        loaded: state.blog.loaded,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        fetchPosts: (stateId) => dispatch(fetchPosts(stateId)),
        invalidatePosts: (stateId) => dispatch(invalidatePosts(stateId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);