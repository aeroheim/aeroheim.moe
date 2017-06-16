import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/reducers';
import { AppContainer } from 'react-hot-loader';
import App from './components/aeroheim';
import fonts from './static/styles/fonts/fonts.css';

document.getElementById('root-spinner').remove();
export const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
)

const render = (Component) =>
{
    ReactDOM.render(
        <AppContainer>
            <Component store={store}/>
        </AppContainer>, 
        document.getElementById('root')
    );
}

render(App);

// For webpack hot module replacement
if (module.hot)
{
    module.hot.accept('./components/aeroheim.js', () =>
    {
        const NextApp = require('./components/aeroheim').default;
        render(NextApp);
    });
}