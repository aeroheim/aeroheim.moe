import React from 'react';
import ReactDOM from 'react-dom';
import { initializeAppStore, initializeAppHistory, App } from './components/aeroheim';

function render(Component, store, history) {
  ReactDOM.hydrate(
    <Component store={store} history={history} />,
    document.getElementById('root'),
  );
}

let initialState = null;
if (typeof window !== 'undefined') {
  // load state from server-side rendered app
  initialState = window.__INITIAL_STATE__;
  delete window.__INITIAL_STATE__;
}

const store = initializeAppStore(initialState);
const history = initializeAppHistory();
render(App, store, history);

// Webpack hot module replacement
if (module.hot) {
  module.hot.accept('./components/aeroheim.jsx', () => {
    // reload Aeroheim and render it again
    const UpdatedComponent = require('./components/aeroheim').default;
    render(UpdatedComponent, store, history);
  });
}
