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
        if (this.props.match)
        {
            this.clearAndUpdatePosts(this.props.match.params.page);
        }
    }

    componentDidUpdate(prevProps)
    {
        // route match
        if (this.props.match && !prevProps.match)
        {
            this.clearAndUpdatePosts(this.props.match.params.page);
        }
        // route unmatch
        else if (!this.props.match && prevProps.match)
        {
            this.clearPosts();
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
                loaded: this.props.loaded,
            });
        }
    }

    clearAndUpdatePosts(page)
    {
        this.clearPosts();

        const limit = 6;
        page = page ? parseInt(page) : 1;
        this.postsStateId = Date.now();
        this.props.fetchPosts(this.postsStateId, limit, page);
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

        return (
            <React.Fragment>
                <Route path='/blog/:id' children={(props) =>
                    // Exclude page from being matched as the 'id' param.
                    <RouteContent path='/blog/:id' {...props} match={props.match && props.match.params && props.match.params.id == 'page' ? null : props.match}>
                        <BlogPost className={this.props.className}/>
                    </RouteContent>}
                />
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match && this.state.loaded}>
                    {({ transitionStyles }) => {
                        return (
                            <div className={`${this.props.className} ${styles.content} ${transitionStyles['content']}`}>
                                <PageHeader className={styles.header} color={styles.blogColor} show={this.props.match}>BLOG</PageHeader>
                                <ul className={`${styles.posts} ${transitionStyles['posts']}`}>
                                    {this.state.posts.map((post) => <BlogListItem className={styles.post} key={post._id} post={post} show={this.props.match}/>)}
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
        page: state.blog.page,
        pages: state.blog.pages,
        loaded: state.blog.loaded,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        fetchPosts: (stateId, limit, page) => dispatch(fetchPosts(stateId, limit, page)),
        invalidatePosts: (stateId) => dispatch(invalidatePosts(stateId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);