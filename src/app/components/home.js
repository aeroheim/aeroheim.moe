import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import LinkButton from './link-button';
import HomeMainButton from './home-main-button';
import HomeExternalButton from './home-external-button';
import SVGInline from 'react-svg-inline';
import Logo from '../static/img/icons/logo-path.svg';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import styles from '../static/styles/components/home.css';

import { matchRoute, unmatchRoute} from '../actions/routes-actions';
import handleMatch from '../util/handle-match';

class Home extends React.Component
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
            logoFrame: new Transition(styles.logoFrameInTransition, 'opacity', 'clip-path'),
            logo: new Transition(styles.logoInTransition, 'stroke-dashoffset'),
            buttons: new Transition(styles.buttonsInTransition, 'opacity'),
            footer: new Transition(styles.footerInTransition, 'opacity', 'transform'),
        }

        const inStyles =
        {
            logoFrame: styles.logoFrameIn,
            logo: styles.logoIn,
            buttons: styles.buttonsIn,
            footer: styles.footerIn,
        }

        const outTransitions =
        {
            logoFrame: new Transition(styles.logoFrameOutTransition, 'opacity', 'clip-path'),
            logo: new Transition(styles.logoOutTransition, 'stroke-dashoffset'),
            buttons: new Transition(styles.buttonsOutTransition, 'opacity'),
            footer: new Transition(styles.footerOutTransition, 'opacity'),
        }

        const outStyles =
        {
            logoFrame: styles.logoFrameOut,
            logo: styles.logoOut,
            buttons: styles.buttonsOut,
            footer: styles.footerOut,
        }

        return (
            <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.match !== null}>
                {({ transitionStyles }) => {
                    return (
                        <div className={styles.page}>
                            <div className={styles.content}>
                                <div className={`${styles.logoFrame} ${transitionStyles['logoFrame']}`}>
                                    <SVGInline svg={Logo} className={`${styles.logo} ${transitionStyles['logo']}`}/>
                                </div>
                                <nav className={`${styles.mainLinks} ${transitionStyles['buttons']}`}>
                                    <HomeMainButton className={styles.link} link='/moonlight' header='moonlight' subtext='aesthetic music player' color={styles.moonlightColor}/>
                                    <HomeMainButton className={styles.link} link='/bumps' header='bumps' subtext='favorite beats with art' color={styles.bumpsColor}/>
                                    <HomeMainButton className={styles.link} link='/blog' header='blog' subtext='thoughts and reflections' color={styles.blogColor}/>
                                </nav>
                                <nav className={`${styles.externalLinks} ${transitionStyles['buttons']}`}>
                                    <HomeExternalButton className={styles.externalLink} link='https://github.com/aeroheim' icon={GithubIcon}/>
                                    <HomeExternalButton className={styles.externalLink} link='https://twitter.com/aeroheim' icon={TwitterIcon}/>
                                    <HomeExternalButton className={styles.externalLink} link='https://www.linkedin.com/in/benjamin-pang-45621290' icon={LinkedInIcon}/>
                                </nav>
                            </div>
                            <span className={`${styles.footer} ${transitionStyles['footer']}`}>
                                © 2017 - best viewed with Chrome/Firefox 55+ -&nbsp;
                                <a className={styles.footerLink} href='https://www.pixiv.net/member_illust.php?mode=medium&illust_id=59460650'>image</a>
                                &nbsp;by&nbsp;
                                <a className={styles.footerLink} href='https://www.pixiv.net/member.php?id=211515'>防人</a>
                            </span>
                        </div>
                    );
                }}
            </AnimatedCSSTransition>
        );
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
