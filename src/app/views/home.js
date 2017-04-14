import React from 'react';
import { Link } from 'react-router-dom';
import LinkButton from '../components/link-button';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from '../static/styles/home.scss';

const Home = () =>
{
    return (
        <Grid fluid>
            <div>
                <Row>
                    <h1>Aeroheim</h1>
                    <p>Logo</p>
                </Row>
                <Row>
                    <Col xs={2}/>
                    <Col xs>
                        <div className={styles.mainLinksRow}>
                            <div className={styles.link}>
                                <LinkButton link="/moonlight">
                                    <h2>moonlight</h2>
                                    <p>aesthetic music player</p>
                                </LinkButton>
                            </div>
                            <div className={styles.link}>
                                <LinkButton link="/bumps">
                                    <h2>bumps</h2>
                                    <p>favorite beats with art</p>
                                </LinkButton>
                            </div>
                            <div className={styles.link}>
                                <LinkButton link="/blog">
                                    <h2>blog</h2>
                                    <p>thoughts and reflections</p>
                                </LinkButton>
                            </div>
                        </div>
                    </Col>
                    <Col xs={2}/>
                </Row>
            </div>
            <Row>
                <Col xs/>
                <Col xs>
                    <div className={styles.externalLinksRow}>
                        <div className={styles.link}>
                            <LinkButton link="https://github.com/aeroheim">
                                <img src={GithubIcon} className={styles.linkIcon}/>
                            </LinkButton>
                        </div>
                        <div className={styles.link}>
                            <LinkButton link="https://twitter.com/aeroheim">
                                <img src={TwitterIcon} className={styles.linkIcon}/>
                            </LinkButton>
                        </div>
                        <div className={styles.link}>
                            <LinkButton link="https://www.linkedin.com/in/benjamin-pang-45621290">
                                <img src={LinkedInIcon} className={styles.linkIcon}/>
                            </LinkButton>
                        </div>
                    </div>
                </Col>
                <Col xs/>
            </Row>
        </Grid>
    );
};

export default Home;