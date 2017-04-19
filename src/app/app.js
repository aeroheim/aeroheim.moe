import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Aeroheim from './views/aeroheim';
import styles from './static/styles/global.scss';
import fonts from './static/styles/fonts/fonts.css';

document.getElementById('root').className = styles.root;
ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={Aeroheim}/>
    </BrowserRouter>
, document.getElementById("root"));