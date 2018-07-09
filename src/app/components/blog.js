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
    }

    componentDidMount()
    {
        if (this.props.match !== null)
        {
            this.props.fetchPosts(Date.now());
        }
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.match !== null && prevProps.match === null)
        {
            this.props.fetchPosts(Date.now());
        }
        else if (this.props.match === null && prevProps.match !== null)
        {
            this.props.invalidatePosts();
        }
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

        const match = this.props.match !== null && this.props.match.isExact;
        return (
            <React.Fragment>
                <Route exact path={this.blogPostPath} children={(props) =>
                    <RouteContent path={this.blogPostPath} {...props}>
                        <BlogPost className={this.props.className} {...this.props}/>
                    </RouteContent>}
                />
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match && this.props.loaded}>
                    {({ transitionStyles }) => {
                        return (
                            <div className={`${this.props.className} ${styles.content} ${transitionStyles['content']}`}>
                                <PageHeader className={styles.header} color={styles.blogColor} show={match}>BLOG</PageHeader>
                                <ul className={`${styles.posts} ${transitionStyles['posts']}`}>
                                    {this.props.posts.map((post) => <BlogListItem className={styles.post} key={post._id} post={post} show={match}/>)}
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
        fetchPosts: (id) => dispatch(fetchPosts(id)),
        invalidatePosts: () => dispatch(invalidatePosts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);