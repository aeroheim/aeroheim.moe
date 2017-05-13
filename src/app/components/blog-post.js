import React from 'react';
import LinkButton from './link-button';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/blog-post.css';

class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            post: this.getPost(),
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps && nextProps.match)
        {
            this.setState({
                post: this.getPost(nextProps),
            })
        }
    }

    getPost(nextProps)
    {
        const props = nextProps ? nextProps : this.props;

        /*
            TODO: query post from backend using id
            post: 
            {
                title,
                description,
                date,
                content, (generated html from a markdown parser)
            }
        */

        const content = <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in magna nec dui condimentum vestibulum. Nulla scelerisque pretium velit rutrum ultrices. Mauris lacinia risus a sagittis posuere. Vestibulum et dolor at urna pellentesque lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean a mattis nunc, id bibendum enim. Ut laoreet rhoncus diam, nec mattis erat semper in. Ut porta convallis massa, et aliquam arcu consectetur vitae. Aenean placerat in dolor ut rhoncus. Nunc interdum arcu ligula. Suspendisse eget est dictum, fringilla purus non, condimentum elit. Mauris molestie interdum rutrum. Sed a purus tincidunt, aliquet turpis a, commodo purus.

Donec sed lorem id elit laoreet iaculis. Aliquam erat volutpat. Vestibulum quis nisi sit amet elit vulputate consequat et id nisl. In vitae ipsum id nibh convallis pellentesque. Sed bibendum sapien dolor, non mollis mi iaculis scelerisque. Maecenas in imperdiet elit. Nunc commodo libero non lectus mattis bibendum sit amet id odio. Aenean lorem sapien, molestie in dui mattis, varius tincidunt massa. Integer id congue mi. Cras rhoncus sit amet lorem mattis fermentum. Cras maximus bibendum dui, id molestie justo pulvinar nec. Nunc eget nunc ut sem fermentum gravida nec id arcu. Pellentesque est nunc, tempor a augue viverra, interdum porttitor lacus. Etiam in nisi eu mi imperdiet luctus quis at dolor.

Donec ac urna sodales, auctor justo nec, viverra neque. Praesent posuere turpis erat, congue ultrices tortor porttitor in. Fusce nec tellus ut orci scelerisque mattis. Etiam felis arcu, ultrices a nisi vitae, rhoncus tincidunt lorem. Praesent in vestibulum metus. Nullam porttitor nisi vel leo tristique accumsan. Ut a ex ut libero placerat fringilla. Duis congue, sapien in blandit bibendum, quam ligula facilisis ipsum, fermentum lacinia quam ante vel justo. Sed iaculis urna non elit suscipit pulvinar. Praesent vitae interdum massa. Integer sodales porttitor lacus, non elementum sapien interdum a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam egestas lorem eget magna vestibulum, ut iaculis nulla laoreet.

Vivamus euismod dolor ut nulla gravida, non faucibus ante tristique. Vivamus id quam eget tellus pretium varius. Pellentesque eget mollis justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut molestie dolor, vitae finibus diam. Proin sollicitudin enim vitae dolor mollis, iaculis ornare odio scelerisque. Donec vel ex nisi. Donec ut iaculis magna. Morbi vitae ipsum eget enim imperdiet rhoncus. Nulla facilisi. Aliquam in sem accumsan, fermentum urna a, fermentum est. Etiam efficitur tincidunt volutpat. Donec nec semper quam, in ultrices quam.

Sed vitae venenatis est, sodales interdum ipsum. Pellentesque congue justo nec nibh feugiat hendrerit. Fusce et arcu elementum, imperdiet erat at, ultrices enim. Vestibulum quis efficitur nisl. Sed vulputate id est quis sagittis. Nullam arcu risus, semper sed porttitor sed, bibendum sed erat. Curabitur ut est malesuada, tincidunt lacus non, eleifend mauris. Suspendisse potenti. Duis suscipit dui quis metus ornare, sit amet malesuada libero placerat. Ut ut ex consectetur, sagittis metus vel, viverra neque. Sed rutrum enim ac mauris commodo placerat eu quis eros. Phasellus venenatis viverra leo viverra vehicula. Suspendisse iaculis varius felis, at feugiat dui.</div>;

        return {
            title: 'An Example Blog Post',
            description: 'This is an example blog post!',
            date: new Date('2017/11/25'),
            content: content,
        };
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
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match != null && this.state.post}>
                {({ transitionStyles, onTransitionEnd }) => {
                    return (
                        <div className={`${styles.content} ${transitionStyles['content']}`} onTransitionEnd={onTransitionEnd}>
                            <LinkButton link='/blog' className={styles.linkButton}>
                                <div className={styles.postColorBar}/>
                                <div className={styles.postText}>
                                    <span className={styles.postTitle}>{this.state.post.title}</span>
                                    <span className={styles.postDate}>{monthFormatter.format(this.state.post.date).toUpperCase()} {this.state.post.date.getDate()}<br/>{this.state.post.date.getFullYear()}</span>
                                    <p className={styles.postDescription}>{this.state.post.description}</p>
                                </div>
                            </LinkButton>
                            <div className={styles.post}>
                                {this.state.post.content}
                            </div>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
}

export default BlogPost;