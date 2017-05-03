import React from 'react';
import { Route } from 'react-router-dom';
import SwitchTransition from './switch-transition';
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
            <SwitchTransition>
                <Route exact path="/" children={(props) => <Home {...props}/>}/>
                <Route exact path="/moonlight" component={Moonlight}/>
                <Route path="/bumps" component={Bumps}/>
                <Route path="/blog" children={(props) => <Blog {...props}/>}/>
                <Route component={ErrorNotFound}/>
            </SwitchTransition>
        </div>
    );
}

export default Aeroheim;