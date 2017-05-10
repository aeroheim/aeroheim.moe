import React from 'react';
import BlogListItem from './blog-list-item';
import AnimatedCSSTransition from './animated-css-transition';
import VerticalAlign from './vertical-align';
import styles from '../static/styles/components/blog.css';

class Blog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            posts: this.getPosts(),
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps && nextProps.match)
        {
            this.setState({
                posts: this.getPosts(),
            })
        }
    }

    getPosts()
    {
        /*
            TODO: query for posts from backend
            post:
            {
                id,
                title,
                description,
                date, (should be a proper date object)
            }
        */
        return [
            {
                id: 0,
                title: 'First Blog Post',
                description: 'DESCRIPTION',
                date: new Date('2017/01/21'),
            },
            {
                id: 1,
                title: 'Sound Voltex Retrospective: 6 months',
                description: 'how to get git gud @ knobs',
                date: new Date('2017/02/21'),
            },
            {
                id: 2,
                title: 'Persona 5: The Waifu Compendium',
                description: 'futaba is best; haru is a sadist',
                date: new Date('2017/11/25'),
            }
        ]
    }

    render()
    {
        const inTransitions =
        {
            content: styles.contentInTransition,
            headerOverlay: styles.headerOverlayInTransition,
            headerBackground: styles.headerBackgroundInTransition,
            posts: styles.postsInTransition,
        }

        const inStyles =
        {
            content: styles.contentIn,
            headerOverlay: styles.headerOverlayIn,
            headerBackground: styles.headerBackgroundIn,
            posts: styles.postsIn,
        }

        const outTransitions =
        {
            content: styles.contentOutTransition,
            headerOverlay: styles.headerOverlayOutTransition,
            headerBackground: styles.headerBackgroundOutTransition,
            posts: styles.postsOutTransition,
        }

        const outStyles =
        {
            content: styles.contentOut,
            headerOverlay: styles.headerOverlayOut,
            headerBackground: styles.headerBackgroundOut,
            posts: styles.postsOut,
        }

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match ? true : false}>
                {({ active, transitionStyles, onTransitionEnd }) => {
                    return (
                        <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                            <div className={styles.header}>
                                <div className={`${styles.headerOverlay} ${transitionStyles['headerOverlay']}`} onTransitionEnd={onTransitionEnd}>
                                    <span className={styles.headerOverlayText}>BLOG</span>
                                </div>
                                <div className={`${styles.headerBackground} ${transitionStyles['headerBackground']}`} onTransitionEnd={onTransitionEnd}/>
                            </div>
                            <ul className={`${styles.posts} ${transitionStyles['posts']}`} onTransitionEnd={onTransitionEnd}>
                                {this.state.posts.map((post) => <BlogListItem key={post.title} post={post} match={this.props.match}/>)}
                            </ul>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
}

export default Blog;