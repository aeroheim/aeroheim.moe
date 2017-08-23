import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import withAnalytics from './util/analytics';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/reducers';
import { AppContainer } from 'react-hot-loader';
import Aeroheim from './components/aeroheim';
import fonts from './static/styles/fonts/fonts.css';

// remove initial loading spinner
document.getElementById('root-spinner').remove();

// initialize redux store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// initialize react-router history
const history = process.env.NODE_ENV === 'production' ? withAnalytics(createHistory()) : createHistory();

// Webpack hot module replacement
if (module.hot)
    {
        module.hot.accept('./components/aeroheim.js', () =>
        {
            // reload Aeroheim and render it again
            const UpdatedComponent = require('./components/aeroheim').default;
            render(UpdatedComponent);
        });
    }

function render(Component)
{
    ReactDOM.render(
        <AppContainer>
            <Component store={store} history={history}/>
        </AppContainer>, 
        document.getElementById('root')
    );
}

render(Aeroheim);

export default store;