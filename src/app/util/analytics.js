import React from 'react';
import { Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

const trackingId = 'UA-101862647-1';

function withAnalytics(history)
{
    // initial page view
    ReactGA.initialize(trackingId);
    ReactGA.set('/');
    ReactGA.pageview('/');

    history.listen((location, action) =>
    {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });

    return history;
}

export default withAnalytics;