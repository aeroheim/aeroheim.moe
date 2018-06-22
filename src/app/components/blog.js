import React from 'react';
import { Route } from 'react-router-dom';
import PageHeader from './page-header';
import BlogListItem from './blog-list-item';
import BlogPost from './blog-post';
import { ErrorHandler } from './error';
import SpinnerCubeGrid from './spinner-cube-grid';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/blog.css';

import { connect } from 'react-redux';
import { fetchPosts, invalidatePosts } from '../actions/blog-actions';
import { matchRoute, unmatchRoute} from '../actions/routes-actions';
import handleMatch from '../util/handle-match';

class Blog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.blogPostPath = `${props.path}/:id`;
        this.onMatch.bind(this);
        this.onUnmatch.bind(this);
    }

    componentDidMount()
    {
        if (this.props.match !== null)
        {
            this.onMatch();
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps)
        {
            handleMatch(this.props, nextProps, 
                () => this.onMatch(), 
                () => this.onUnmatch());
        }
    }

    onMatch()
    {
        const id = Math.random();
        this.props.fetchPosts(id);
        this.props.matchRoute(this.props.path);
    }

    onUnmatch()
    {
        this.props.invalidatePosts();
        this.props.unmatchRoute(this.props.path);
    }

    render()
    {
        const inTransitions =
        {
            mainContent: new Transition(styles.mainContentInTransition, 'left'),
            posts: new Transition(styles.postsInTransition, 'opacity', 'clip-path'),
        }

        const inStyles =
        {
            mainContent: styles.mainContentIn,
            posts: styles.postsIn,
        }

        const outTransitions =
        {
            mainContent: new Transition(styles.mainContentOutTransition, 'opacity'),
            posts: new Transition(styles.postsOutTransition, 'opacity'),
        }

        const outStyles =
        {
            mainContent: styles.mainContentOut,
            posts: styles.postsOut,
        }

        const match = this.props.match !== null;
        const err = this.props.err !== null;

        return (
            <div className={`${this.props.className} ${styles.page}`}>
                <Route exact path={this.blogPostPath} children={(props) => <BlogPost className={styles.content} path={this.blogPostPath} {...props} />}/>
                <ErrorHandler className={styles.content} err={this.props.err} />
                <SpinnerCubeGrid className={`${styles.content} ${styles.postsSpinner}`} color={styles.postsSpinnerColor} show={match && !err && !this.props.loaded}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match && this.props.loaded}>
                    {({ transitionStyles }) => {
                        return (
                            <div className={`${styles.content} ${styles.mainContent} ${transitionStyles['mainContent']}`}>
                                <PageHeader className={styles.header} color={styles.blogColor} show={match}>BLOG</PageHeader>
                                <ul className={`${styles.posts} ${transitionStyles['posts']}`}>
                                    {this.props.posts.map((post) => <BlogListItem key={post._id} post={post} show={match}/>)}
                                </ul>
                            </div>
                        );
                    }}
                </AnimatedCSSTransition>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    const props = state.blog;
    return {
        posts: props.posts !== null ? props.posts : [],
        loaded: props.loaded,
        err: props.err,
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        fetchPosts: (id) => dispatch(fetchPosts(id)),
        invalidatePosts: () => dispatch(invalidatePosts()),
        matchRoute: (path) => dispatch(matchRoute(path)),
        unmatchRoute: (path) => dispatch(unmatchRoute(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);