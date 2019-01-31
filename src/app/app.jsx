import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import withAnalytics from './util/analytics';
import rootReducer from './reducers/reducers';
import Aeroheim from './components/aeroheim';
import './static/styles/fonts/fonts.css';

// remove initial loading spinner
document.getElementById('root-spinner').remove();

// initialize redux store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// initialize react-router history
const history = process.env.NODE_ENV === 'production' ? withAnalytics(createBrowserHistory()) : createBrowserHistory();

function render(Component) {
  ReactDOM.render(
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

render(Aeroheim);
