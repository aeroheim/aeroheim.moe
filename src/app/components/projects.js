import React from 'react';
import { connect } from 'react-redux';
import { setAppError, NotImplementedError } from '../actions/app-actions';

class Projects extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        if (this.props.match)
        {
            this.props.setAppError(NotImplementedError);
        }
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.match)
        {
            this.props.setAppError(NotImplementedError);
        }
    }

    render()
    {
        return null;
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        setAppError: (error) => dispatch(setAppError(error)),
    }
}

export default connect(null, mapDispatchToProps)(Projects);