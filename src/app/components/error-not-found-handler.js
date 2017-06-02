import React from 'react';
import { withRouter, matchPath } from 'react-router';
import { Route } from 'react-router-dom';
import { ErrorNotFound } from './error';

const ErrorNotFoundHandler = (props) =>
{
    let matchCount = 0;

    props.children.forEach((route) =>
    {
        if (matchPath(props.location.pathname, { path: route.props.path, exact: route.props.exact }))
        {
            ++matchCount;
        }
    });

    console.log(props);

    return (
        <span>
            {props.children}
        </span>
    );
}

export default withRouter(ErrorNotFoundHandler);

