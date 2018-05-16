import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Header from './header';
import Footer from './footer';
import Home from './home';
import Projects from './projects';
import Blog from './blog';
import About from './about';
import ErrorNotFoundRoute from './error-route';
import styles from '../static/styles/components/aeroheim.css';

const homePath = '/';
const blogPath = '/blog';
const projectsPath ='/projects';
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
                <Header className={styles.header}/>
                <Route exact path={homePath} children={(props) => <Home className={styles.content} path={homePath} {...props}/>}/>
                <Route exact path={projectsPath} children={(props) => <Projects className={styles.content} path={projectsPath} {...props}/>}/>
                <Route exact path={blogPath} children={(props) => <Blog className={styles.content} path={blogPath} {...props}/>}/>
                <Route exact path={aboutPath} children={(props) => <About className={styles.content} path={aboutPath} {...props}/>}/>
                <ErrorNotFoundRoute className={styles.content}/>
                <Footer className={styles.footer}/>
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