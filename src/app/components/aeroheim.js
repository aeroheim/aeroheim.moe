import React from 'react';
import { Route } from 'react-router-dom';
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
                <Route path='/blog' children={(props) => <Blog {...props}/>}/>
                <Route exact path='/about' children={(props) => <About {...props}/>}/>
            </ErrorNotFoundHandler>
        </div>
    );
}

export default Aeroheim;