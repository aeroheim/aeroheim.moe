import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/reducers';
import App from './components/aeroheim';
import fonts from './static/styles/fonts/fonts.css';

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
)

const render = (Component) =>
{
    ReactDOM.render(<Component store={store}/>, document.getElementById('root'));
}

render(App);

console.log('main');

// For webpack hot module reloading
if (module.hot)
{
    module.hot.accept('./components/aeroheim.js', () =>
    {
        const NextApp = require('./components/aeroheim').default;
        render(NextApp);
    });
}
