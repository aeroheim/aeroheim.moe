import React from 'react';
import { Route } from 'react-router-dom';
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
            posts: props.match && props.match.isExact ? this.getPosts() : [],
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps && nextProps.match && nextProps.match.isExact)
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
                date, 
            }
        */
        return [
            {
                id: 'first-blog-post',
                title: 'First Blog Post',
                description: 'DESCRIPTION',
                date: new Date('2017/01/21'),
            },
            {
                id: 'sound-voltex-retrospective-6-months',
                title: 'Sound Voltex Retrospective: 6 months',
                description: 'how to get git gud @ knobs',
                date: new Date('2017/02/21'),
            },
            {
                id: 'persona-5-the-waifu-compendium',
                title: 'Persona 5: The Waifu Compendium',
                description: 'futaba is best; haru is a sadist',
                date: new Date('2017/11/25'),
            },
        ]
    }

    render()
    {
        const inTransitions =
        {
            content: styles.contentInTransition,
            headerBackground: styles.headerBackgroundInTransition,
            posts: styles.postsInTransition,
        }

        const inStyles =
        {
            content: styles.contentIn,
            headerBackground: styles.headerBackgroundIn,
            posts: styles.postsIn,
        }

        const outTransitions =
        {
            content: styles.contentOutTransition,
            headerBackground: styles.headerBackgroundOutTransition,
            posts: styles.postsOutTransition,
        }

        const outStyles =
        {
            content: styles.contentOut,
            headerBackground: styles.headerBackgroundOut,
            posts: styles.postsOut,
        }

        return (
            <div>
                <Route path='/blog/:id' children={(props) => <BlogPost {...props}/>}/>
                <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match && this.props.match.isExact ? true : false}>
                    {({ active, transitionStyles, onTransitionEnd }) => {
                        return (
                            <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                                <div className={styles.header}>
                                    <div className={styles.headerOverlay}>
                                        <span className={styles.headerOverlayText}>BLOG</span>
                                    </div>
                                    <div className={`${styles.headerBackground} ${transitionStyles['headerBackground']}`} onTransitionEnd={onTransitionEnd}/>
                                </div>
                                <ul className={`${styles.posts} ${transitionStyles['posts']}`} onTransitionEnd={onTransitionEnd}>
                                    {this.state.posts.map((post) => <BlogListItem key={post.id} post={post} show={this.props.match && this.props.match.isExact}/>)}
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