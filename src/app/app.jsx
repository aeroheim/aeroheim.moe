import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import withAnalytics from './util/analytics';
import rootReducer from './reducers/reducers';
import Aeroheim from './components/aeroheim';
import './static/styles/fonts/fonts.css';

function initializeAppStore(state) {
  return state
    ? createStore(rootReducer, state, applyMiddleware(thunkMiddleware))
    : createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

function initializeAppHistory() {
  return process.env.NODE_ENV === 'production'
    ? withAnalytics(createHistory())
    : createHistory();
}

function render(Component, store, history) {
  ReactDOM.hydrate(
    <Component store={store} history={history} />,
    document.getElementById('root'),
  );
}

// Webpack hot module replacement
if (module.hot) {
  module.hot.accept('./components/aeroheim.jsx', () => {
    // reload Aeroheim and render it again
    const UpdatedComponent = require('./components/aeroheim').default;
    render(UpdatedComponent);
  });
}

let initialState = null;
if (typeof window !== 'undefined') {
  // load state from server-side rendered app
  initialState = window.__INITIAL_STATE__;
  delete window.__INITIAL_STATE__;
}

document.getElementById('root-spinner').remove();
render(Aeroheim, initializeAppStore(initialState), initializeAppHistory());

export default initializeAppStore;
