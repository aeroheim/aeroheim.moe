import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Moonlight from './moonlight';
import Bumps from './bumps';
import Blog from './blog';
import Header from '../components/header';
import ErrorNotFound from './404';

const Aeroheim = () =>
{
    return (
        <div>
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