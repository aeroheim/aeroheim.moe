import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/reducers';
import Aeroheim from './components/aeroheim';
import fonts from './static/styles/fonts/fonts.css';

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

const App = () =>
{
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path='/' component={Aeroheim}/>
            </BrowserRouter>
        </Provider>
    );
}

document.getElementById('loadingLogo').remove();
ReactDOM.render(<App/>, document.getElementById('root'));

if (module.hot)
{
    module.hot.accept('./app', () =>
    {
        let app = App;
        ReactDOM.render(<app/>, document.getElementById('root'));
    });
}
