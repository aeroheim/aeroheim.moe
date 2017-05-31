import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Axios from 'axios';
import PageHeader from './page-header';
import BlogListItem from './blog-list-item';
import BlogPost from './blog-post';
import SpinnerCubeGrid from './spinner-cube-grid';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog.css';

import { fetchPosts } from '../actions/blog-actions';

class Blog extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        if (this.props.match && this.props.match.isExact)
        {
            this.props.fetchPosts();
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps && nextProps.match && nextProps.match.isExact && !this.props.loaded)
        {
            this.props.fetchPosts();
        }
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

        const match = this.props.match && this.props.match.isExact ? true : false;

        return (
            <div>
                <Route path='/blog/:id' children={(props) => <BlogPost {...props}/>}/>
                <SpinnerCubeGrid className={styles.postsSpinner} color={styles.postsSpinnerColor} show={match && !this.props.loaded}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match && this.props.loaded}>
                    {({ transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={styles.page}>
                                <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                    <PageHeader className={styles.headerStyle} color={styles.headerColor} show={match}>BLOG</PageHeader>
                                    <div className={styles.postsContent}>
                                        <ul className={`${styles.posts} ${transitionStyles['posts']}`} onTransitionEnd={onTransitionEnd}>
                                            {this.props.posts.map((post) => <BlogListItem key={post._id} post={post} show={this.props.match !== null && this.props.match.isExact}/>)}
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
        fetchPosts: () => dispatch(fetchPosts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);