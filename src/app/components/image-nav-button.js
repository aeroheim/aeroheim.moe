import React from 'react';
import { Link } from 'react-router-dom';

const ImageNavButton = ({ link, image }) =>
{
    return (
        <Link to={link}>
            <button className="img-btn" type="button" tabIndex="-1">
                <img src={image}/>
            </button>
        </Link>
    );
};

export default ImageNavButton;