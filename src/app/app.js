import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { initializeStore, initializeHistory, App } from './components/aeroheim';

let preloadedState;
if (typeof window !== 'undefined')
{
    // load state from server-side rendered app
    preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
}

// initialize redux
const store = initializeStore(preloadedState);

// initialize react-router
const history = initializeHistory();

// Webpack hot module replacement
if (module.hot)
{
    module.hot.accept('./components/aeroheim.js', () =>
    {
        // re-import for new changes and then render again
        const UpdatedApp = require('./components/aeroheim').App;
        ReactDOM.render(
            <Provider store={store}>
                <Router history={history}>
                    <UpdatedApp/>
                </Router>
            </Provider>
        , document.getElementById('root'));
    });
}

ReactDOM.hydrate(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
, document.getElementById('root'));

export default store;