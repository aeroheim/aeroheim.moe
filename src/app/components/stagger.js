import React from 'react';
import PropTypes from 'prop-types';

class Stagger extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            children: [],
            renderedChildren: [],
            currentChildToRenderIndex: 1,
        };

        this.timeoutId = null;
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount()
    {
        this.onUpdate();
    }

    componentDidUpdate(prevProps)
    {
        this.onUpdate();
    }

    componentWillUnmount()
    {
        clearTimeout(this.timeoutId);
    }

    onUpdate()
    {
        let newChildrenReceived = false;
        if (this.state.children.length !== this.props.children.length)
        {
            newChildrenReceived = true;
        }
        else
        {
            for (let i = 0; i < this.props.children.length; ++i)
            {
                if (this.state.children[i].key !== this.props.children[i].key)
                {
                    newChildrenReceived = true;
                    break;
                }
            }
        }

        // reset state and re-execute stagger.
        if (newChildrenReceived)
        {
            this.timeoutId = null;
            this.setState({
                children: this.props.children,
                renderedChildren: this.props.children ? [this.props.children[0]] : [],
                currentChildToRenderIndex: 1,
            });
        }
        // continue stagger.
        else if (this.state.children && !this.timeoutId && this.state.currentChildToRenderIndex < this.state.children.length)
        {
            const timeoutId = setTimeout(() => {
                this.timeoutId = null;
                this.setState({
                    children: this.state.children,
                    renderedChildren: this.state.renderedChildren.concat(this.state.children[this.state.currentChildToRenderIndex]),
                    currentChildToRenderIndex: this.state.currentChildToRenderIndex + 1,
                });
            }, this.props.delay);

            // record timeout id to prevent additional staggers from occurring until the current stagger cycle has finished.
            // this id is also needed to clear the timeout incase the component is unmounted before the timeout occurs.
            this.timeoutId = timeoutId;
        }
    }

    render()
    {
        return this.state.renderedChildren;
    }
}

Stagger.propTypes =
{
    children: PropTypes.node.isRequired,
    delay: (props, propName, componentName) =>
    {
        if (!props[propName] || !(typeof props[propName] === 'number') || props[propName] < 0)
        {
            return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be an number greater than zero.`);
        }
    },
}

export default Stagger;