import React from 'react';
import { withRouter, matchPath } from 'react-router';
import { Route } from 'react-router-dom';

// Behaves the same as react-router's Switch, except that Routes using the 'children' prop are always rendered.
// This is required to correctly animate components that use RouteTransitions, since they always be rendered no matter what.
const SwitchTransition = (props) =>
{
    let matchFound = false;
    const childrenToRender = props.children.filter((route) => 
    {
        if (!matchFound && matchPath(props.location.pathname, { path: route.props.path, exact: route.props.exact }))
        {
            matchFound = true;
            return true;
        }

        if (route.props.children)
        {
            return true;
        }
    });

    return <span>{childrenToRender}</span>;
}

export default withRouter(SwitchTransition);

