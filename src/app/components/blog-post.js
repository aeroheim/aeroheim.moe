import React from 'react';
import { connect } from 'react-redux';
import LinkButton from './link-button';
import SpinnerCubeGrid from './spinner-cube-grid';
import BlogPostParser from '../util/blog-post-parser';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

import { fetchPost } from '../actions/blog-post-actions';

class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        if (this.props.match && !this.props.loaded)
        {
            this.props.fetchPost(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if ((this.props !== nextProps) && nextProps.match !== null && (nextProps.match.params.id !== this.props.id))
        {
            this.props.fetchPost(nextProps.match.params.id);
        }
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
            <div>
                <SpinnerCubeGrid className={styles.postSpinner} color={styles.postSpinnerColor} show={this.props.match !== null && !this.props.loaded}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null && this.props.loaded}>
                    {({ transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={styles.page}>
                                <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                    <LinkButton link='/blog' className={styles.linkButton}>
                                        <div className={styles.postColorBar}/>
                                        <div className={styles.postText}>
                                            <span className={styles.postTitle}>{this.props.title}</span>
                                            <span className={styles.postDate}>{monthFormatter.format(this.props.date).toUpperCase()} {this.props.date.getDate()}<br/>{this.props.date.getFullYear()}</span>
                                        </div>
                                        <p className={styles.postDescription}>{this.props.description}</p>
                                    </LinkButton>
                                    <article className={styles.post}>
                                        {this.props.content}
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

const mapStateToProps = (state) =>
{
    const props = state.blogPost;
    return {
        id: props.id,
        title: props.title,
        description: props.description,
        date: props.date,
        content: props.content,
        loaded: props.loaded,
        err: props.err,
    };
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        fetchPost: (id) => { console.log('request'); dispatch(fetchPost(id)); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);