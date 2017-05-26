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

        this.mounted = false;
        this.isDone = this.isDone.bind(this);
        this.transition = this.transition.bind(this);
        this.transitionInternal = this.transitionInternal.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    componentDidMount()
    {
        this.mounted = true;
        if (this.props.show)
        {
            this.transition();
        }
    }

    componentWillUnmount()
    {
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props !== nextProps)
        {
            if ((nextProps.show !== this.state.active) || !this.isDone())
            {
                // transitionInternal() will be called after render(), so this.props will already be set to nextProps when it runs.
                this.transition();
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

    transition()
    {
        // Need to wait until the children have been rendered at least once with the transition style before applying
        // the target style, otherwise no transition occurs. Call requestAnimationFrame to ensure that the transition
        // occurs after render().
        setTimeout(() => requestAnimationFrame(() => this.transitionInternal()), 0);
    }

    transitionInternal()
    {
        // Reset the finished state to begin the transition. The show & active values need to be verified 
        // again since they may have changed between the time transition() was called and now.
        if (this.isDone() && this.props.show !== this.state.active)
        {
            for (const key in this.finished)
            {
                this.finished[key] = false;
            }
        }

        if (!this.isDone())
        {
            for (const key in this.transitions)
            {
                if (this.transitions === this.inTransitions)
                {
                    this.styles[key] = `${this.inTransitions[key]} ${this.props.show ? this.inStyles[key] : ''}`;
                }
                else
                {
                    this.styles[key] = `${this.inTransitions[key]} ${this.inStyles[key]} ${this.outTransitions[key]} ${!this.props.show ? this.outStyles[key] : ''}`;
                }
            }

            if (this.mounted)
            {
                this.setState({
                    active: this.state.active,
                    transitionStyles: this.styles,
                });
            }
        }
    }

    onTransitionEnd(e)
    {
        // onTransitionEnd events can bubble from children of elements with transition styles.
        // Therefore events from those child elements must be filtered out.
        let isTransitionElement = false;
        for (const key in this.transitions)
        {
            if (e.target.className.includes(this.transitions[key]))
            {
                isTransitionElement = true;
                this.finished[key] = true;
            }
        }

        if(isTransitionElement && this.isDone())
        {
            this.transitions = this.props.show ? this.outTransitions : this.inTransitions;

            // reset styles
            for (const key in this.transitions)
            {
                this.styles[key] = this.props.show ? `${this.inTransitions[key]} ${this.inStyles[key]} ${this.outTransitions[key]}`: this.inTransitions[key];
            }

            if (this.mounted)
            {
                this.setState({
                    active: this.props.show,
                    transitionStyles: this.styles,
                });
            }
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