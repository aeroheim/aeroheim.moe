import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchRoute, unmatchRoute } from '../actions/routes-actions';
import deepEqual from 'deep-equal';

class RouteContent extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        if (this.props.match !== null)
        {
            this.props.matchRoute(this.props.path);
        }
    }

    componentDidUpdate(prevProps)
    {
        if (!deepEqual(this.props.match, prevProps.match))
        {
            if (this.props.match)
            {
                this.props.matchRoute(this.props.path);
            }
            else
            {
                this.props.unmatchRoute(this.props.path);
            }
        }
    }

    render()
    {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children, x => React.cloneElement(x, { ...this.props }))}
            </React.Fragment>
        );
    }
}

RouteContent.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
};

function mapDispatchToProps(dispatch)
{
    return {
        matchRoute: (path) => dispatch(matchRoute(path)),
        unmatchRoute: (path) => dispatch(unmatchRoute(path)),
    }
}

export default connect(null, mapDispatchToProps)(RouteContent);