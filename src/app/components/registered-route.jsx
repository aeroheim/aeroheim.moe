import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import deepEqual from 'deep-equal';
import { matchRoute, unmatchRoute } from '../actions/routes-actions';

class RegisterRoute extends React.Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.matchRoute(this.props.path);
    }
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.match, prevProps.match)) {
      if (this.props.match) {
        this.props.matchRoute(this.props.path);
      } else {
        this.props.unmatchRoute(this.props.path);
      }
    }
  }

  componentWillUnmount() {
    this.props.unmatchRoute(this.props.path);
  }

  render() {
    let children = null;
    if (this.props.component) {
      children = (
        <this.props.component
          match={this.props.match}
          location={this.props.location}
          history={this.props.history}
        />
      );
    } else if (this.props.render) {
      children = this.props.render({
        match: this.props.match,
        location: this.props.location,
        history: this.props.history,
      });
    } else if (this.props.children) {
      children = this.props.children({
        match: this.props.match,
        location: this.props.location,
        history: this.props.history,
      });
    }

    return children;
  }
}

RegisterRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    matchRoute: path => dispatch(matchRoute(path)),
    unmatchRoute: path => dispatch(unmatchRoute(path)),
  };
}

const ConnectedRegisterRoute = connect(null, mapDispatchToProps)(RegisterRoute);
const RegisteredRoute = (props) => {
  const wrappedProps = Object.assign({}, props);
  const wrappedComponent = ({ match, location, history }) => <ConnectedRegisterRoute {...props} match={match} location={location} history={history} />;

  if (props.component) {
    wrappedProps.component = wrappedComponent;
  } else if (props.render) {
    wrappedProps.render = wrappedComponent;
  } else if (props.children) {
    wrappedProps.children = wrappedComponent;
  }

  return <Route {...wrappedProps} />;
};

export default RegisteredRoute;
