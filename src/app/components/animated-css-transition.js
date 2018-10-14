import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Transition
{
    constructor(style, ...transitionProperties)
    {
        this.style = style;
        this.finished = {};

        for (let i = 0; i < transitionProperties.length; ++i)
        {
            this.finished[transitionProperties[i]] = false;
        }

        this.reset = this.reset.bind(this);
        this.finishTransition = this.finishTransition.bind(this);
        this.setDone = this.setDone.bind(this);
        this.isDone = this.isDone.bind(this);
    }

    reset()
    {
        for (const key in this.finished)
        {
            this.finished[key] = false;
        }
    }

    finishTransition(transitionProperty)
    {
        this.finished[transitionProperty] = true;
    }

    setDone(done)
    {
        for (const key in this.finished)
        {
            this.finished[key] = done;
        }
    }

    isDone()
    {
        for (const key in this.finished)
        {
            if (!this.finished[key])
            {
                return false;
            }
        }

        return true;
    }
}

class AnimatedCSSTransition extends React.Component
{
    constructor(props)
    {
        super(props);

        this.inTransitions = props.inTransitions;
        this.inStyles = props.inStyles;
        this.outTransitions = props.outTransitions;
        this.outStyles = props.outStyles;

        // transitions - the current set of transition objects, either inTransitions or outTransitions
        this.transitions = props.inTransitions;

        // styles - the complete set of styles to apply to elements, including both the base in/out styles as well as the transition styles
        this.styles = {};

        for (const key in this.transitions)
        {
            this.transitions[key].setDone(!this.props.show);
            this.styles[key] = this.transitions[key].style;
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
        const element = ReactDOM.findDOMNode(this);
        if (element)
        {
            element.addEventListener('transitionend', this.onTransitionEnd);
        }

        this.mounted = true;
        if (this.props.show)
        {
            this.transition();
        }
    }

    componentWillUnmount()
    {
        const element = ReactDOM.findDOMNode(this);
        if (element)
        {
            element.removeEventListener('transitionend', this.onTransitionEnd);
        }

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
        for (const key in this.transitions)
        {
            if (!this.transitions[key].isDone())
            {
                return false;
            }
        }

        return true;
    }

    transition()
    {
        // Need to wait until the children have been rendered at least once with the transition style before applying
        // the target style, otherwise no transition occurs. Call requestAnimationFrame to ensure that the transition
        // occurs after render().
        setTimeout(() => requestAnimationFrame(() => this.transitionInternal()), 50);
    }

    transitionInternal()
    {
        // Reset the finished state to begin the transition. The show & active values need to be verified 
        // again since they may have changed between the time transition() was called and now.
        if (this.isDone() && this.props.show !== this.state.active)
        {
            // TODO: investigate null DOM node errors - somehow got unmounted before we got here
            // Any child component that remounts will stop bubbling events up. The event listener must be re-applied to enabling bubbling again.
            ReactDOM.findDOMNode(this).removeEventListener('transitionend', this.onTransitionEnd);
            ReactDOM.findDOMNode(this).addEventListener('transitionend', this.onTransitionEnd);

            this.transitions = this.props.show ? this.inTransitions : this.outTransitions;

            for (const key in this.transitions)
            {
                this.inTransitions[key].reset();
                this.outTransitions[key].reset();
            }
        }

        if (!this.isDone())
        {
            for (const key in this.transitions)
            {
                if (this.transitions === this.inTransitions)
                {
                    this.styles[key] = `${this.inTransitions[key].style} ${this.props.show ? this.inStyles[key] : ''}`;
                }
                else
                {
                    this.styles[key] = `${this.inTransitions[key].style} ${this.inStyles[key]} ${this.outTransitions[key].style} ${!this.props.show ? this.outStyles[key] : ''}`;
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
        for (const key in this.transitions)
        {
            // filter out elements that aren't using any of the transition styles
            const styles = e.target.className instanceof SVGAnimatedString 
                ? e.target.className.baseVal 
                : e.target.className;

            if (styles.includes(this.transitions[key].style))
            {
                if (this.transitions[key].finished[e.propertyName] !== undefined)
                {
                    this.transitions[key].finishTransition(e.propertyName);
                }
            }
        }

        if(this.isDone())
        {
            // set to final style for in/out state
            for (const key in this.transitions)
            {
                this.styles[key] = this.props.show ? `${this.inTransitions[key].style} ${this.inStyles[key]} ${this.outTransitions[key].style}`: this.inTransitions[key].style;
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
            ? this.props.children(this.state) 
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

export { AnimatedCSSTransition, Transition };