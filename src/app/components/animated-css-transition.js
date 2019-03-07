import React from 'react';
import PropTypes from 'prop-types';

class Transition {
  constructor(style, ...transitionProperties) {
    this.style = style;
    this.finished = {};

    for (let i = 0; i < transitionProperties.length; ++i) {
      this.finished[transitionProperties[i]] = false;
    }

    this.reset = this.reset.bind(this);
    this.finishTransition = this.finishTransition.bind(this);
    this.setTransitionFinished = this.setTransitionFinished.bind(this);
    this.isTransitionFinished = this.isTransitionFinished.bind(this);
  }

  reset() {
    for (const key in this.finished) {
      this.finished[key] = false;
    }
  }

  finishTransition(transitionProperty) {
    this.finished[transitionProperty] = true;
  }

  setTransitionFinished(done) {
    for (const key in this.finished) {
      this.finished[key] = done;
    }
  }

  isTransitionFinished() {
    for (const key in this.finished) {
      if (!this.finished[key]) {
        return false;
      }
    }

    return true;
  }
}

class AnimatedCSSTransition extends React.Component {
  constructor(props) {
    super(props);

    // in styles are applied when the components are entering/mounting
    this.inStyles = props.inStyles;
    this.inTransitions = props.inTransitions;

    // out styles are applied when the components are leaving/unmounting
    this.outStyles = props.outStyles;
    this.outTransitions = props.outTransitions;

    // transitions - the current set of transitions to apply, either inTransitions or outTransitions
    this.transitions = props.inTransitions;

    // styles - the complete set of styles to apply to elements, including both the base in/out styles as well as the transition styles
    this.styles = {};

    for (const key in this.transitions) {
      // the default state is set to finished so that a new transition can begin.
      this.transitions[key].setTransitionFinished(true);
      this.styles[key] = this.transitions[key].style;
    }

    // active refers to the state being transitioned from - false for out -> in, true for in -> out.
    this.active = false;
    this.timeoutId = null;

    this.state = {
      transitionStyles: this.styles,
    };

    if (global.__SERVER__ && props.show) {
      this.active = true;
      this.styles = this.inStyles;
      this.state = {
        transitionStyles: this.styles,
      };
    }
  }

  componentDidMount() {
    if (this.props.show) {
      this.transition();
    }
  }

  componentDidUpdate(prevProps) {
    // transitions should only trigger if props has actually changed.
    if (this.props !== prevProps) {
      // when show and active are mismatched, this means that an animation should be triggered.
      // it's also possible for show and active to match again in the middle of an ongoing transition
      // in which case the transition should be reversed by triggering another transition.
      if (this.props.show !== this.active || !this.isTransitionFinished()) {
        this.transition();
      }
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutId);
  }

  onTransitionEnd = (e) => {
    // the onTransitionEnd event bubbles up from children, so make sure to only handle when necessary.
    if (!this.isTransitionFinished()) {
      for (const key in this.transitions) {
        // filter out elements that aren't using any of the transition styles
        const styles = e.target.className instanceof SVGAnimatedString
          ? e.target.className.baseVal
          : e.target.className;

        const finishedTransitionProperty = e.propertyName;
        if (styles.includes(this.transitions[key].style) && this.transitions[key].finished[finishedTransitionProperty] !== undefined) {
          this.transitions[key].finishTransition(finishedTransitionProperty);
        }
      }

      if (this.isTransitionFinished()) {
        // set to final style for in/out state
        for (const key in this.transitions) {
          this.styles[key] = this.props.show ? `${this.inStyles[key]} ${this.outTransitions[key].style}` : this.inTransitions[key].style;
        }

        this.setState({ transitionStyles: this.styles });
      }
    }
  }

  transitionInternal = () => {
    // start and trigger a new transition.
    if (this.props.show !== this.active && this.isTransitionFinished()) {
      this.transitions = this.props.show ? this.inTransitions : this.outTransitions;
      for (const key in this.transitions) {
        this.inTransitions[key].reset();
        this.outTransitions[key].reset();
      }
    }

    // continue a triggered transition - this can start a new transition or reverse an ongoing transition.
    if (!this.isTransitionFinished()) {
      for (const key in this.transitions) {
        if (this.transitions === this.inTransitions) {
          this.styles[key] = `${this.inTransitions[key].style} ${this.props.show ? this.inStyles[key] : ''}`;
        } else {
          this.styles[key] = `${this.inStyles[key]} ${this.outTransitions[key].style} ${!this.props.show ? this.outStyles[key] : ''}`;
        }
      }

      this.active = this.props.show;
      this.timeoutId = null;
      this.setState({ transitionStyles: this.styles });
    }
  }

  transition = () => {
    window.clearTimeout(this.timeoutId);

    // children must first be rendered once with only the in/out transition style before the target in/out styles can be applied - if both are
    // applied at the same time no transition occurs. setTimeout is used to ensure that the transition occurs after the first render.
    this.timeoutId = window.setTimeout(() => this.transitionInternal(), 50);
  }

  isTransitionFinished = () => {
    for (const key in this.transitions) {
      if (!this.transitions[key].isTransitionFinished()) {
        return false;
      }
    }
    return true;
  }

  render() {
    return (this.props.show || this.active || !this.isTransitionFinished())
      ? this.props.children({ ...this.state, onTransitionEnd: this.onTransitionEnd })
      : null;
  }
}

AnimatedCSSTransition.propTypes = {
  inStyles: PropTypes.object.isRequired,
  inTransitions: PropTypes.object.isRequired,
  outStyles: PropTypes.object.isRequired,
  outTransitions: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

export { AnimatedCSSTransition, Transition };
