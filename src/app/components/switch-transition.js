import React from 'react';
import { withRouter, matchPath } from 'react-router';
import { Route } from 'react-router-dom';

// Behaves the same as react-router's Switch, except that Routes using the 'children' prop are always rendered.
// This is required to correctly animate components that use RouteTransitions, since they must be rendered at all times.
const SwitchTransition = (props) =>
{
    let matchCount = 0;

    let childrenToRender = props.children.filter((route) => 
    {
        if (matchCount === 0 && matchPath(props.location.pathname, { path: route.props.path, exact: route.props.exact }))
        {
            ++matchCount;
            return true;
        }

        if (route.props.children)
        {
            if (matchPath(props.location.pathname, { path: route.props.path, exact: route.props.exact }))
            {
                ++matchCount;
            }

            return true;
        }
    });

    childrenToRender = React.Children.map(childrenToRender, (child) => React.cloneElement(child, { matchCount: matchCount }));
    return <span>{childrenToRender}</span>;
}

export default withRouter(SwitchTransition);

