import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Aeroheim from './views/aeroheim';
import fonts from './static/styles/fonts/fonts.css';

document.getElementById("loadingLogo").remove();
ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={Aeroheim}/>
    </BrowserRouter>
, document.getElementById("root"));
