import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Header from './header';
import Footer from './footer';
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

class Aeroheim extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className={styles.page} style={!this.props.scrollbarVisible ? { overflowY: 'hidden' } : null}>
                <Header/>
                <Route exact path={homePath} children={(props) => <Home {...props} path={homePath}/>}/>
                <Route exact path={moonlightPath} children={(props) => <Moonlight {...props} path={moonlightPath}/>}/>
                <Route exact path={bumpsPath} children={(props) => <Bumps {...props} path={bumpsPath}/>}/>
                <Route exact path={blogPath} children={(props) => <Blog {...props} path={blogPath}/>}/>
                <Route exact path={aboutPath} children={(props) => <About {...props} path={aboutPath}/>}/>
                <ErrorNotFoundRoute/>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    const props = state.app;
    return {
        scrollbarVisible: props.scrollbarVisibility,
    }
}

const App = ({ store, history }) =>
{
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={connect(mapStateToProps)(Aeroheim)}/>
            </Router>
        </Provider>
    );
}

export default App;