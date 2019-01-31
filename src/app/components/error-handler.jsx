import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Transition, AnimatedCSSTransition } from './animated-css-transition';
import { setAppError, clearAppError, NotFoundError, NotImplementedError } from '../actions/app-actions';
import styles from '../static/styles/components/error-handler.css';

const defaultErrorTitle = 'error';
const defaultErrorText = 'something went wrong. try again later';

class ErrorHandler extends React.PureComponent {
  constructor(props) {
    super(props);

    // cache props received from redux in state. this allows the component to display
    // cached values when the redux store is cleared while the component is transitioning
    // to a new set of props or unmounting.
    this.state = {
      title: null,
      text: null,
    };
  }

  componentDidMount() {
    // check for initial 404.
    if (this.props.error === null) {
      this.initializeError();
    }
  }

  componentDidUpdate(prevProps) {
    // error should only be re-initialized if a route transition occurred without the error changing,
    // or if the route changed while the current error is a 404.
    if ((this.props.error === 404 || this.props.error === prevProps.error) && this.props.activeRoutes !== prevProps.activeRoutes) {
      this.initializeError();
    } else if (this.props.error && this.props.error !== prevProps.error) {
      // new error received.
      let title = defaultErrorTitle;
      let text = defaultErrorText;

      switch (this.props.error) {
        case NotImplementedError:
          title = 'WIP';
          text = 'coming soon. check again later';
          break;
        case NotFoundError:
          title = this.props.error;
          text = "there's nothing here";
          break;
        default:
          break;
      }

      this.setState({
        title,
        text,
      });
    }
  }

  initializeError() {
    if (this.props.activeRoutes.size === 0) {
      // no route matched - 404 error.
      this.props.setAppError(404);
    } else if (this.props.error) {
      // route changed - clear error.
      this.props.clearAppError();
    }
  }

  render() {
    const inTransitions = {
      content: new Transition(styles.contentInTransition, 'opacity', 'clip-path'),
    };

    const inStyles = {
      content: styles.contentIn,
    };

    const outTransitions = {
      content: new Transition(styles.contentOutTransition, 'opacity'),
    };

    const outStyles = {
      content: styles.contentOut,
    };

    return (
      <AnimatedCSSTransition inTransitions={inTransitions} inStyles={inStyles} outTransitions={outTransitions} outStyles={outStyles} show={this.props.error !== null}>
        {({ transitionStyles, onTransitionEnd }) => (
          <div className={`${this.props.className} ${styles.content} ${transitionStyles.content}`} onTransitionEnd={onTransitionEnd}>
            <h1 className={styles.header}>{this.state.title}</h1>
            <p className={styles.text}>{this.state.text}</p>
          </div>
        )}
      </AnimatedCSSTransition>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.app.error,
    activeRoutes: state.routes.activeRoutes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAppError: error => dispatch(setAppError(error)),
    clearAppError: () => dispatch(clearAppError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ErrorHandler));
