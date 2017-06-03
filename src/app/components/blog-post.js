import React from 'react';
import LinkButton from './link-button';
import { ErrorHandler } from './error';
import SpinnerCubeGrid from './spinner-cube-grid';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

import { connect } from 'react-redux';
import { fetchPost, invalidatePost } from '../actions/blog-post-actions';
import { matchRoute, unmatchRoute} from '../actions/routes-actions';
import handleMatch from '../util/handle-match';

class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
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
                () => this.onMatch(nextProps), 
                () => this.onUnmatch());
        }
    }

    onMatch(nextProps)
    {
        const props = nextProps !== undefined ? nextProps : this.props;
        this.props.fetchPost(props.match.params.id);
        this.props.matchRoute(props.path);
    }

    onUnmatch()
    {
        this.props.invalidatePost();
        this.props.unmatchRoute(this.props.path);
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
        const match = this.props.match !== null;
        const err = this.props.err !== null;

        return (
            <div>
                <ErrorHandler err={this.props.err}/>
                <SpinnerCubeGrid className={styles.postSpinner} color={styles.postSpinnerColor} show={match && !err && !this.props.loaded}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={match && this.props.loaded}>
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
        fetchPost: (id) => dispatch(fetchPost(id)),
        invalidatePost: () => dispatch(invalidatePost()),
        matchRoute: (path) => dispatch(matchRoute(path)),
        unmatchRoute: (path) => dispatch(unmatchRoute(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);