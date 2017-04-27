import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Moonlight from './moonlight';
import Bumps from './bumps';
import Blog from './blog';
import Header from './header';
import ErrorNotFound from './404';
import styles from '../static/styles/components/aeroheim.css';

const Aeroheim = () =>
{
    return (
        <div className={styles.background}>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/moonlight" component={Moonlight}/>
                <Route path="/bumps" component={Bumps}/>
                <Route path="/blog" component={Blog}/>
                <Route path="*" component={ErrorNotFound}/>
            </Switch>
        </div>
    );
}

export default Aeroheim;