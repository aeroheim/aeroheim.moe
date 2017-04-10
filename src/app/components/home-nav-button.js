import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavButton = ({ link, text, subtext }) =>
{
    return (
        <Link to={link}>
            <button className="home-btn" type="button" tabIndex="-1">
                <h2>{text}</h2>
                <p>{subtext}</p>
            </button>
        </Link>
    );
};

export default HomeNavButton;