import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorNotFoundHandler from './error-not-found-handler';
import Header from './header';
import Home from './home';
import Moonlight from './moonlight';
import Bumps from './bumps';
import Blog from './blog';
import About from './about';
import styles from '../static/styles/components/aeroheim.css';

const Aeroheim = () =>
{
    return (
        <div className={styles.background}>
            <Header/>
            <ErrorNotFoundHandler>
                <Route exact path='/' children={(props) => <Home {...props}/>}/>
                <Route exact path='/moonlight' component={Moonlight}/>
                <Route path='/bumps' component={Bumps}/>
                <Route exact path='/blog' children={(props) => <Blog {...props}/>}/>
                <Route exact path='/about' children={(props) => <About {...props}/>}/>
            </ErrorNotFoundHandler>
        </div>
    );
}

const App = ({ store }) =>
{
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path='/' component={Aeroheim}/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;