import React from 'react';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import HomeMainButton from './home-main-button';
import HomeExternalButton from './home-external-button';
import SVGInline from 'react-svg-inline';
import Logo from '../static/img/icons/aeroheim-logo_monotone.svg';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import styles from '../static/styles/components/home.css';

class Home extends React.PureComponent
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const inTransitions =
        {
            logoBox: new Transition(styles.logoBoxInTransition, 'opacity', 'clip-path'),
            buttons: new Transition(styles.buttonsInTransition, 'opacity'),
        }

        const inStyles =
        {
            logoBox: styles.logoBoxIn,
            buttons: styles.buttonsIn,
        }

        const outTransitions =
        {
            logoBox: new Transition(styles.logoBoxOutTransition, 'opacity', 'clip-path'),
            buttons: new Transition(styles.buttonsOutTransition, 'opacity'),
        }

        const outStyles =
        {
            logoBox: styles.logoBoxOut,
            buttons: styles.buttonsOut,
        }

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null}>
                {({ transitionStyles }) => {
                    return (
                        <div className={`${this.props.className} ${styles.content}`}>
                            <div className={styles.contentGrid}>
                                <div className={styles.mainContentFlex}>
                                    <div className={`${styles.logoBox} ${transitionStyles['logoBox']}`}>
                                        <SVGInline svg={Logo} className={`${styles.logo}`}/>
                                    </div>
                                    <nav className={`${styles.mainLinksGrid} ${transitionStyles['buttons']}`}>
                                        <HomeMainButton className={`${styles.mainLink}`} link='/blog' header='blog' subtext='thoughts and reflections' color={styles.blogColor}/>
                                        <HomeMainButton className={`${styles.mainLink}`} link='/projects' header='projects' subtext='coding works / projects' color={styles.projectsColor}/>
                                        <HomeMainButton className={`${styles.mainLink}`} link='/about' header='about' subtext='introduction & bio' color={styles.aboutColor}/>
                                    </nav>
                                </div>
                                <nav className={`${styles.externalLinksFlex} ${transitionStyles['buttons']}`}>
                                    <HomeExternalButton className={styles.externalLink} link='https://github.com/aeroheim' icon={GithubIcon}/>
                                    <HomeExternalButton className={styles.externalLink} link='https://twitter.com/aeroheim' icon={TwitterIcon}/>
                                    <HomeExternalButton className={styles.externalLink} link='https://www.linkedin.com/in/benjamin-pang-45621290' icon={LinkedInIcon}/>
                                </nav>
                            </div>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
};

export default Home;
