import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import RegisteredRoute from './registered-route';
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
                <RegisteredRoute exact path='/' children={props =>
                    <Home className={styles.content} {...props}/>
                }/>
                <RegisteredRoute exact path='/projects' children={props =>
                    <Projects className={styles.content} {...props}/>
                }/>
                <RegisteredRoute exact path='/blog' children={props =>
                    <Blog className={styles.content} {...props}/>
                }/>
                <RegisteredRoute exact path='/about' children={props =>
                    <About className={styles.content} {...props}/>
                }/>
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