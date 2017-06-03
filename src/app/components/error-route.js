import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ErrorNotFound } from './error';

const ErrorNotFoundRoute = ({ activeRoutes }) =>
{
    return <ErrorNotFound show={Object.keys(activeRoutes).length === 0}/>
}

function mapStateToProps(state)
{
    const props = state.routes;
    return {
        activeRoutes: props.activeRoutes,
    }
}

export default connect(mapStateToProps)(ErrorNotFoundRoute);

