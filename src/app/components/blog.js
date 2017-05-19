import React from 'react';
import { Route } from 'react-router-dom';
import Axios from 'axios';
import PageHeader from './page-header';
import BlogListItem from './blog-list-item';
import BlogPost from './blog-post';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog.css';

class Blog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            posts: [],
        }
    }

    componentDidMount()
    {
        if (this.props.match && this.props.match.isExact)
        {
            this.getPosts();
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps && nextProps.match && nextProps.match.isExact)
        {
            this.getPosts();
        }
    }

    getPosts()
    {
        Axios.get('/api/blog')
        .then((res) =>
        {
            this.setState({
                posts: res.data,
            })
        })
        .catch((err) =>
        {
            this.setState({
                posts: [],
            });
        });
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

        const show = this.props.match && this.props.match.isExact ? true : false;

        return (
            <div>
                <Route path='/blog/:id' children={(props) => <BlogPost {...props}/>}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={show}>
                    {({ active, transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                <PageHeader text='BLOG' className={styles.headerStyle} color={styles.headerColor} show={show}/>
                                <ul className={`${styles.posts} ${transitionStyles['posts']}`} onTransitionEnd={onTransitionEnd}>
                                    {this.state.posts.map((post) => <BlogListItem key={post._id} post={post} show={this.props.match && this.props.match.isExact}/>)}
                                </ul>
                            </div>
                        );
                    }}
                </AnimatedCSSTransition>
            </div>
        );
    }
}

export default Blog;