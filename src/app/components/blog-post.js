import React from 'react';
import axios from 'axios';
import marksy from 'marksy/components';
import LinkButton from './link-button';
import SpinnerCubeGrid from './spinner-cube-grid';
import BlogPostParser from './blog-post-parser';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            post: null,
            responseReceived: false,
            responseValid: false,
        }
    }

    componentDidMount()
    {
        if (this.props.match)
        {
            this.getPost();
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps && nextProps.match)
        {
            this.getPost(nextProps);
        }
    }

    getPost(nextProps)
    {
        const props = nextProps ? nextProps : this.props;
        
        this.setState({
            post: this.state.post,
            responseReceived: false,
            responseValid: false,
        });

        axios.get(`/api/blog/${props.match.params.id}`)
        .then((res) =>
        {
            res.data.date = new Date(res.data.date);
            res.data.content = BlogPostParser(res.data.content).tree;

            this.setState({
                post: res.data,
                responseReceived: true,
                responseValid: true,
            });
        })
        .catch((err) =>
        {
            this.setState({
                post: this.state.post,
                responseReceived: true,
                responseValid: false,
            });
        });
    }

    render()
    {
        const inTransitions =
        {
            content: styles.contentInTransition,
        }

        const inStyles =
        {
            content: styles.contentIn,
        }

        const outTransitions =
        {
            content: styles.contentOutTransition,
        }

        const outStyles =
        {
            content: styles.contentOut,
        }

        const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });
        const hasData = this.state.responseReceived && this.state.responseValid;

        return (
            <div>
                <SpinnerCubeGrid className={styles.postSpinner} color={styles.postSpinnerColor} show={this.props.match !== null && !hasData}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null && hasData}>
                    {({ transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={styles.page}>
                                <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                    <LinkButton link='/blog' className={styles.linkButton}>
                                        <div className={styles.postColorBar}/>
                                        <div className={styles.postText}>
                                            <span className={styles.postTitle}>{this.state.post.title}</span>
                                            <span className={styles.postDate}>{monthFormatter.format(this.state.post.date).toUpperCase()} {this.state.post.date.getDate()}<br/>{this.state.post.date.getFullYear()}</span>
                                        </div>
                                        <p className={styles.postDescription}>{this.state.post.description}</p>
                                    </LinkButton>
                                    <article className={styles.post}>
                                        {this.state.post.content}
                                    </article>
                                </div>
                            </div>
                        );
                    }}
                </AnimatedCSSTransition>
            </div>
        );
    }
}

export default BlogPost;