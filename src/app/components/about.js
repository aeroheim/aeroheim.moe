import React from 'react';
import { connect } from 'react-redux';
import PageHeader from './page-header';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
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
            bio: new Transition(styles.bioInTransition, 'opacity', 'clip-path'),
        }

        const inStyles =
        {
            bio: styles.bioIn,
        }

        const outTransitions =
        {
            bio: new Transition(styles.bioOutTransition, 'opacity', 'clip-path'),
        }

        const outStyles =
        {
            bio: styles.bioOut,
        }

        const age = new Date(Date.now() - new Date('1993/01/21')).getFullYear() - 1970;
        
        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null}>
                {({ transitionStyles }) => {
                    return (
                        <div className={`${this.props.className} ${styles.content}`}>
                            <PageHeader className={styles.header} color={styles.aboutColor} show={this.props.match !== null}>ABOUT</PageHeader>
                            <article className={`${styles.bio} ${transitionStyles['bio']}`}>
                                <h1 style={{marginBottom: 0}}>Benjamin Pang (龐天擇) :</h1>
                                <p>
                                    I'm a {`${age}`}-year-old software engineer from Austin, TX. Born in Canada, I spent part 
                                    <br/>
                                    of my childhood in Hong Kong and grew up in the states. I graduated from 
                                    <br/>
                                    The University of Texas at Austin with a B.S Computer Science in 2015.
                                </p>
                                <p>
                                    I <i>dig</i> mechanical keyboards (average ~150WPM):
                                    <ul className={styles.list}>
                                        <li>Winkeyless 22mini-B w/ Hako Clears + EnjoyPBT Hiragana</li>
                                        <li>Leopold FC660C w/ Hypersphere rings ♥</li>
                                    </ul>
                                    I'm also a long-time MMO junkie, avid gamer, and otoge fan:
                                    <ul className={styles.list}>
                                        <li>Past: <i>Ragnarok Online, Granado Espada, Aion, FFXIV, Tree of Savior</i></li>
                                        <li>Current: <i>Black Desert Online (NA) - Aeroheim family</i></li>
                                        <li>Sound Voltex: sitting at ~9150 VOLFORCE 😭</li>
                                    </ul>
                                    You can hit me up at the following links:
                                    <ul className={styles.list}>
                                        <li><a className={styles.link} href='https://twitter.com/aeroheim'>twitter</a></li>
                                        <li><a className={styles.link} href='mailto:aeroheim@gmail.com'>mail</a></li>
                                    </ul>
                                </p>
                            </article>
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