import React from 'react';
import Axios from 'axios';
import Showdown from 'showdown';
import LinkButton from './link-button';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
        this.converter = new Showdown.Converter();
        this.converter.setFlavor('github');
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

        Axios.get(`/api/blog/${props.match.params.id}`)
        .then((res) =>
        {
            res.data.date = new Date(res.data.date);
            res.data.content = this.converter.makeHtml(res.data.content);

            this.setState({
                post: res.data,
                responseReceived: true,
                responseValid: true,
            })
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

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null && this.state.responseReceived && this.state.responseValid}>
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
                                <div className={styles.post} dangerouslySetInnerHTML={{__html: this.state.post.content}}/>
                            </div>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
}

export default BlogPost;