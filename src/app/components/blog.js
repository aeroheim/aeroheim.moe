import React from 'react';
import { Route } from 'react-router-dom';
import Axios from 'axios';
import PageHeader from './page-header';
import BlogListItem from './blog-list-item';
import BlogPost from './blog-post';
import SpinnerCubeGrid from './spinner-cube-grid';
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
            responseReceived: false,
            responseValid: false,
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
        this.setState({
            posts: [],
            responseReceived: false,
            responseValid: false,
        });

        Axios.get('/api/blog')
        .then((res) =>
        {
            this.setState({
                posts: res.data,
                responseReceived: true,
                responseValid: true,
            })
        })
        .catch((err) =>
        {
            this.setState({
                posts: [],
                responseReceived: true,
                responseValid: false,
            });

            // TODO: render an error component
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

        const match = this.props.match && this.props.match.isExact ? true : false;
        const hasData = this.state.responseReceived && this.state.responseValid;

        return (
            <div>
                <Route path='/blog/:id' children={(props) => <BlogPost {...props}/>}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match}>
                    {({ transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={styles.page}>
                                <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                    <SpinnerCubeGrid className={styles.spinner} color={styles.spinnerColor} show={match && !hasData}/>
                                    <PageHeader className={styles.headerStyle} color={styles.headerColor} show={match}>BLOG</PageHeader>
                                    <div className={styles.postsContent}>
                                        <ul className={`${styles.posts} ${transitionStyles['posts']}`} onTransitionEnd={onTransitionEnd}>
                                            {this.state.posts.map((post) => <BlogListItem key={post._id} post={post} show={this.props.match !== null && this.props.match.isExact}/>)}
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

export default Blog;