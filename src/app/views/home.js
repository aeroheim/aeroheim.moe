import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavButton from '../components/home-nav-button';
import ImageNavButton from '../components/image-nav-button';
import GithubIcon from '../static/img/icons/github.svg';
import TwitterIcon from '../static/img/icons/twitter.svg';
import LinkedInIcon from '../static/img/icons/linkedin.svg';

const Home = () =>
{
    return (
        <div>
            <h1>Aeroheim</h1>
            <p>Logo</p>
            <div id="home-main-btn-row">
                <HomeNavButton id="home-moonlight-btn" link="/moonlight" text="moonlight" subtext="aesthetic music player"/>
                <HomeNavButton id="home-bumps-btn" link="/bumps" text="bumps" subtext="favorite beats with art"/>
                <HomeNavButton id="home-blog-btn" link="/blog" text="blog" subtext="thoughts and reflections"/>
            </div>
            <div id="home-redirect-btn-row">
                <ImageNavButton className="home-img-btn" link="https://github.com/aeroheim" image={GithubIcon}/>
                <ImageNavButton className="home-img-btn" link="https://twitter.com/aeroheim" image={TwitterIcon}/>
                <ImageNavButton className="home-img-btn" link="https://www.linkedin.com/in/benjamin-pang-45621290" image={LinkedInIcon}/>
            </div>
        </div>
    );
};

export default Home;