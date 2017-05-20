import React from 'react';
import { withRouter, matchPath } from 'react-router';
import { Route } from 'react-router-dom';
import ErrorNotFound from './error-not-found';

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

    return (
        <span>
            {props.children}
            <Route children={(props) => <ErrorNotFound {...props} show={matchCount === 0}/>}/>
        </span>
    );
}

export default withRouter(ErrorNotFoundHandler);

