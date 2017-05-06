import React from 'react';
import PropTypes from 'prop-types';
import Interpolator from './interpolator.js';

class AnimatedTransition extends React.Component
{
    constructor(props)
    {
        super(props);

        this.show = false;

        this.interpolatorIns = {};
        Object.keys(props.transitionIns).forEach(key =>
        {
            this.interpolatorIns[key] = new Interpolator(props.transitionIns[key]);
        });
        this.interpolatorOuts = {};
        Object.keys(props.transitionOuts).forEach(key =>
        {
            this.interpolatorOuts[key] = new Interpolator(props.transitionOuts[key]);
        });
        this.interpolators = this.interpolatorIns;
        this.transitionValues = {};
        
        this.previousRenderTimestamp = 0;
        this.state = 
        {
            active: false,
            transitionValues: this.transitionValues,
        }

        this.transition = this.transition.bind(this);
        this.isDone = this.isDone.bind(this);
    }

    transition()
    {
        const elapsedTime = Date.now() - this.previousRenderTimestamp;

        // match & interpolators determines direction of interpolations
        Object.keys(this.interpolators).forEach(key => 
        {
            const interpolator = this.interpolators[key];
            this.transitionValues[key] = this.interpolators === this.interpolatorIns 
                ? interpolator.interpolate(this.show ? elapsedTime : -elapsedTime)
                : interpolator.interpolate(this.show ? -elapsedTime : elapsedTime);
        });

        const isDone = this.isDone();

        // interpolators switch and reset once finished
        if (isDone)
        {
            if (this.show)
            {
                this.interpolators = this.interpolatorOuts;
                Object.keys(this.interpolatorIns).forEach(key =>
                {
                    this.interpolatorIns[key].reset();
                });
            }
            else
            {
                this.interpolators = this.interpolatorIns;
                Object.keys(this.interpolatorOuts).forEach(key =>
                {
                    this.interpolatorOuts[key].reset();
                });
            }
        }

        // update state with new transition values to trigger re-render
        this.setState({
            active: isDone ? !this.state.active : this.state.active,
            transitionValues: this.transitionValues,
        });
    }

    isDone()
    {
        for (const key of Object.keys(this.interpolators))
        {
            if (!this.interpolators[key].isDone())
            {
                return false;
            }
        }

        return true;
    }

    render()
    {
        const isDone = this.isDone();
        this.show = this.props.show;

        if ((this.show !== this.state.active) || !isDone)
        {
            this.previousRenderTimestamp = Date.now();
            requestAnimationFrame(this.transition);
        }

        return (this.show || this.state.active || !isDone) 
            ? this.props.children(this.state)
            : null;
    }
}

AnimatedTransition.propTypes = 
{
    transitionIns: PropTypes.object.isRequired,
    transitionOuts: PropTypes.object.isRequired,
}

export default AnimatedTransition;