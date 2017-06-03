import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './header';
import Home from './home';
import Moonlight from './moonlight';
import Bumps from './bumps';
import Blog from './blog';
import About from './about';
import ErrorNotFoundRoute from './error-route';
import styles from '../static/styles/components/aeroheim.css';

const homePath = '/';
const moonlightPath ='/moonlight';
const bumpsPath ='/bumps';
const blogPath = '/blog';
const aboutPath = '/about';

const Aeroheim = () =>
{
    return (
        <div className={styles.background}>
            <Header/>
            <Route exact path={homePath} children={(props) => <Home {...props} path={homePath}/>}/>
            <Route exact path={moonlightPath} component={Moonlight}/>
            <Route exact path={bumpsPath} component={Bumps}/>
            <Route exact path={blogPath} children={(props) => <Blog {...props} path={blogPath}/>}/>
            <Route exact path={aboutPath} children={(props) => <About {...props} path={aboutPath}/>}/>
            <ErrorNotFoundRoute/>
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