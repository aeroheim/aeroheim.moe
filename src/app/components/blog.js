import React from 'react';
import { Route } from 'react-router-dom';
import PageHeader from './page-header';
import BlogListItem from './blog-list-item';
import BlogPost from './blog-post';
import { ErrorHandler } from './error';
import SpinnerCubeGrid from './spinner-cube-grid';
import AnimatedCSSTransition from './animated-css-transition';
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
            content: styles.contentInTransition,
            posts: styles.postsInTransition,
        }

        const inStyles =
        {
            content: styles.contentIn,
            posts: styles.postsIn,
        }

        const outTransitions =
        {
            content: styles.contentOutTransition,
            posts: styles.postsOutTransition,
        }

        const outStyles =
        {
            content: styles.contentOut,
            posts: styles.postsOut,
        }

        const match = this.props.match !== null;
        const err = this.props.err !== null;

        return (
            <div>
                <Route exact path={this.blogPostPath} children={(props) => <BlogPost { ...props } path={this.blogPostPath}/>}/>
                <ErrorHandler err={this.props.err}/>
                <SpinnerCubeGrid className={styles.postsSpinner} color={styles.postsSpinnerColor} show={match && !err && !this.props.loaded}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match && this.props.loaded}>
                    {({ transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={styles.page}>
                                <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                    <PageHeader className={styles.headerStyle} color={styles.headerColor} show={match}>BLOG</PageHeader>
                                    <div className={styles.postsContent}>
                                        <ul className={`${styles.posts} ${transitionStyles['posts']}`} onTransitionEnd={onTransitionEnd}>
                                            {this.props.posts.map((post) => <BlogListItem key={post._id} post={post} show={match}/>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </AnimatedCSSTransition>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const props = state.blog;
    return {
        posts: props.posts !== null ? props.posts : [],
        loaded: props.loaded,
        err: props.err,
    };
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        fetchPosts: (id) => dispatch(fetchPosts(id)),
        invalidatePosts: () => dispatch(invalidatePosts()),
        matchRoute: (path) => dispatch(matchRoute(path)),
        unmatchRoute: (path) => dispatch(unmatchRoute(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);