import React from 'react';
import { connect } from 'react-redux';
import PageHeader from './page-header';
import AnimatedCSSTransition from './animated-css-transition';
import styles from '../static/styles/components/about.css';

import { matchRoute, unmatchRoute} from '../actions/routes-actions';
import handleMatch from '../util/handle-match';

class About extends React.Component
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
                () => this.onMatch(), 
                () => this.onUnmatch());
        }
    }

    onMatch()
    {
        this.props.matchRoute(this.props.path);
    }

    onUnmatch()
    {
        this.props.unmatchRoute(this.props.path);
    }

    render()
    {
        const inTransitions =
        {
            bio: styles.bioInTransition,
        }

        const inStyles =
        {
            bio: styles.bioIn,
        }

        const outTransitions =
        {
            bio: styles.bioOutTransition,
        }

        const outStyles =
        {
            bio: styles.bioOut,
        }

        const age = new Date(Date.now() - new Date('1993/01/21')).getFullYear() - 1970;
        
        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null}>
                {({ transitionStyles, onTransitionEnd }) => {
                    return (
                        <div className={styles.page}>
                            <div className={styles.content}>
                                <PageHeader className={styles.headerStyle} color={styles.headerColor} show={this.props.match !== null}>ABOUT</PageHeader>
                                <article className={`${styles.bio} ${transitionStyles['bio']}`} onTransitionEnd={onTransitionEnd}>
                                    <h1>Benjamin Pang (龐天擇).</h1>
                                    <p>{`I'm a ${age}-year-old Software Engineer working in Austin, Texas. I graduated from The University of Texas at Austin with a B.S. in Computer Science in 2015.`}</p>
                                    <p>
                                        My mechanical keyboards (~175WPM):
                                        <ul>
                                            <li>Whitefox ARIA w/ Gateron Blues</li>
                                            <li>Leopold FC660C w/ Hypersphere rings ♥</li>
                                        </ul>
                                        Currently playing the following games:
                                        <ul>
                                            <li>FFXIV: Stormblood (<a href='http://na.finalfantasyxiv.com/lodestone/character/2238847/' className={styles.bioLink}>Aeroheim Lkofsnaso</a> @ Ultros)</li>
                                            <li>Sound Voltex: grinding from SKILL LEVEL11 -> 12</li>
                                        </ul>
                                        Technologies I'm interested in right now:
                                        <ul>
                                            <li>React</li>
                                            <li>Electron</li>
                                        </ul>
                                    </p>
                                    <p>You can reach me at <a href='mailto:aeroheim@gmail.com' className={styles.bioLink}>aeroheim@gmail.com</a></p>
                                </article>
                            </div>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
}

function mapStateToProps(state)
{
    return {};
}

function mapDispatchToProps(dispatch)
{
    return {
        matchRoute: (path) => dispatch(matchRoute(path)),
        unmatchRoute: (path) => dispatch(unmatchRoute(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);