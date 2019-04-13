import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import withAnalytics from '../util/analytics';
import rootReducer from '../reducers/reducers';
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
import '../static/styles/global/index.css';
import '../static/styles/fonts/fonts.css';

const Aeroheim = props => (
  <div id="app" className={styles.page} style={!props.scrollbarEnabled ? { overflowY: 'hidden' } : null}>
    <ErrorHandler className={styles.content} />
    <SpinnerCubeGrid className={styles.spinner} show={props.loading} />
    <Header className={styles.header} />
    <RegisteredRoute exact path="/" children={props => <Home className={styles.content} {...props} />} />
    <RegisteredRoute exact path="/projects" children={props => <Projects className={styles.content} {...props} />} />
    <RegisteredRoute exact path="/blog" children={props => <Blog className={styles.content} {...props} />} />
    <RegisteredRoute exact path="/about" children={props => <About className={styles.content} {...props} />} />
    <Footer className={styles.footer} />
  </div>
);

function mapStateToProps(state) {
  return {
    scrollbarEnabled: state.app.scrollbarEnabled,
    loading: state.app.loading,
  };
}

export function initializeAppStore(state) {
  return state
    ? createStore(rootReducer, state, applyMiddleware(thunkMiddleware))
    : createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

export function initializeAppHistory() {
  return process.env.NODE_ENV === 'production'
    ? withAnalytics(createBrowserHistory())
    : createBrowserHistory();
}

// HOC-wrapped components passed to Routes need to be lifted to an outer scope, otherwise
// the components will remount everytime the route changes.
const AeroheimWithHOC = connect(mapStateToProps)(Aeroheim);
export const AppRoot = () => <Route path="/" component={AeroheimWithHOC} />;
export const App = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AppRoot />
      </Router>
    </Provider>
  );
};

export default App;
