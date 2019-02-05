import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAppError, NotImplementedError } from '../actions/app-actions';

class Projects extends React.Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.setAppError(NotImplementedError);
    }
  }

  componentDidUpdate() {
    if (this.props.match) {
      this.props.setAppError(NotImplementedError);
    }
  }

  render() {
    return null;
  }
}

Projects.propTypes = {
  match: PropTypes.object.isRequired,
  setAppError: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    setAppError: error => dispatch(setAppError(error)),
  };
}

export default connect(null, mapDispatchToProps)(Projects);
