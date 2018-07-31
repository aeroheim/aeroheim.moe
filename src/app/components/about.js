import React from 'react';
import PageHeader from './page-header';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import styles from '../static/styles/components/about.css';

class About extends React.PureComponent
{
    constructor(props)
    {
        super(props);
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
                                <span>I <i>adore</i> mechanical keyboards (average ~150WPM):</span>
                                <ul className={styles.list}>
                                    <li>Winkeyless 22mini-B w/ Hako Clears + EnjoyPBT Hiragana</li>
                                    <li>Leopold FC660C w/ Hypersphere rings ♥</li>
                                </ul>
                                <span>I'm also a long-time MMO junkie, avid gamer, and otoge fan:</span>
                                <ul className={styles.list}>
                                    <li>Past: <i>Ragnarok Online, Granado Espada, Aion, FFXIV, Tree of Savior</i></li>
                                    <li>Current: <i>Black Desert Online (NA) - Aeroheim family</i></li>
                                    <li>Sound Voltex: sitting at ~9150 VOLFORCE 😭</li>
                                    <li>Girls Frontline: aeroheim - UID 227756, add me!</li>
                                </ul>
                                <span>You can hit me up at the following links:</span>
                                <ul className={styles.list}>
                                    <li><a className={styles.link} href='https://twitter.com/aeroheim'>twitter</a></li>
                                    <li><a className={styles.link} href='mailto:aeroheim@gmail.com'>mail</a></li>
                                </ul>
                            </article>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
}

export default About;