import React from 'react';
import PropTypes from 'prop-types';

class AnimatedCSSTransition extends React.Component
{
    constructor(props)
    {
        super(props);

        this.inTransitions = props.inTransitions;
        this.inStyles = props.inStyles;
        this.outTransitions = props.outTransitions;
        this.outStyles = props.outStyles;

        this.transitions = props.inTransitions;
        this.finished = {};
        this.styles = {};
        for (const key in this.transitions)
        {
            this.finished[key] = !this.props.show;
            this.styles[key] = this.transitions[key];
        }
        
        this.state = 
        {
            active: false,
            transitionStyles: this.styles,
        }

        this.isDone = this.isDone.bind(this);
        this.transition = this.transition.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    componentDidMount()
    {
        if (this.props.show)
        {
            // NOTE: Setting state via transition() inside of here leads to a weird situation in which styles 
            // aren't applied to the children correctly. A callback is used to circumvent this issue.
            setTimeout(() => this.transition(), 0);
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps)
        {
            if (nextProps.show !== this.state.active)
            {
                this.transition(nextProps);
            }
        }
    }

    isDone()
    {
        let isDone = true;
        for (const key in this.finished)
        {
            if (!this.finished[key])
            {
                isDone = false;
                break;
            }
        }

        return isDone;
    }

    transition(nextProps)
    {
        const props = nextProps !== undefined ? nextProps : this.props;

        for (const key in this.transitions)
        {
            if (this.transitions === this.inTransitions)
            {
                this.styles[key] = `${this.inTransitions[key]} ${props.show ? this.inStyles[key] : ''}`;
            }
            else
            {
                this.styles[key] = `${this.outTransitions[key]} ${!props.show ? this.outStyles[key] : ''}`;
            }
        }

        this.setState({
            active: this.state.active,
            transitionStyles: this.styles,
        });
    }

    onTransitionEnd(e)
    {
        for (const key in this.transitions)
        {
            if (e.target.className.includes(this.transitions[key]))
            {
                this.finished[key] = true;
            break;
            }
        }

        if(this.isDone())
        {
            // swap transitions if necessary
            if (this.props.show && this.transitions === this.inTransitions)
            {
                this.transitions = this.outTransitions;
            }
            else if (!this.props.show && this.transitions === this.outTransitions)
            {
                this.transitions = this.inTransitions;
            }

            // reset styles
            for (const key in this.transitions)
            {
                this.finished[key] = false;
                this.styles[key] = this.transitions[key];
            }

            this.setState({
                active: this.props.show,
                transitionStyles: this.styles,
            });
        }
    }

    render()
    {
        return (this.props.show || this.state.active || !this.isDone())
            ? this.props.children(Object.assign({}, { onTransitionEnd: this.onTransitionEnd }, this.state )) 
            : null;
    }
}

AnimatedCSSTransition.propTypes = 
{
    inStyles: PropTypes.object.isRequired,
    inTransitions: PropTypes.object.isRequired,
    outStyles: PropTypes.object.isRequired,
    outTransitions: PropTypes.object.isRequired,
}

export default AnimatedCSSTransition;