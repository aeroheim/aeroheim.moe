import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import RouteContent from './route-content';
import Header from './header';
import Footer from './footer';
import Home from './home';
import Projects from './projects';
import Blog from './blog';
import About from './about';
import ErrorHandler from './error-handler';
import SpinnerCubeGrid from './spinner-cube-grid';
import styles from '../static/styles/components/aeroheim.css';

class Aeroheim extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div id='app' className={styles.page} style={!this.props.scrollbarEnabled ? { overflowY: 'hidden' } : null}>
                <ErrorHandler className={styles.content} />
                <SpinnerCubeGrid className={styles.spinner} show={this.props.loading}/>
                <Header className={styles.header}/>
                <Route exact path='/' children={(props) =>
                    <RouteContent path='/' {...props}>
                        <Home className={styles.content}/>
                    </RouteContent>}
                />
                <Route exact path='/projects' children={(props) =>
                    <RouteContent path='/projects' {...props}>
                        <Projects className={styles.content}/>
                    </RouteContent>}
                />
                <Route exact path='/blog' children={(props) =>
                    <RouteContent path='/blog' {...props}>
                        <Blog className={styles.content}/>
                    </RouteContent>}
                />
                <Route exact path='/about' children={(props) =>
                    <RouteContent path='/about' {...props}>
                        <About className={styles.content}/>
                    </RouteContent>}
                />
                <Footer className={styles.footer}/>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        scrollbarEnabled: state.app.scrollbarEnabled,
        loading: state.app.loading,
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