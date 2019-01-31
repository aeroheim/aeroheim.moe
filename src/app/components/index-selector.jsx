import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PrevIcon from '../static/img/icons/prev.svg';
import NextIcon from '../static/img/icons/next.svg';
import styles from '../static/styles/components/index-selector.css';

class IndexSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoToIndex = this.handleGoToIndex.bind(this);
    this.createIndexElement = this.createIndexElement.bind(this);
    this.createGoToIndexElement = this.createGoToIndexElement.bind(this);
    this.generateIndices = this.generateIndices.bind(this);
  }

  handleGoToIndex(e) {
    e.preventDefault();
    const index = e.target.goto.value;
    if (this.props.url) {
      this.props.history.push(this.props.url.replace('{index}', index));
    } else {
      this.props.onIndexChange(index);
    }
  }

  createIndexElement(index) {
    return this.props.url
      ? (
        <Link key={index} className={`${styles.index} ${index === this.props.index ? styles.activeIndex : ''}`} to={this.props.url.replace('{index}', index)}>
          {index}
        </Link>
      )
      : (
        <button type="button" key={index} className={`${styles.index} ${index === this.props.index ? styles.activeIndex : ''}`} onClick={() => this.props.onIndexChange(index)}>
          {index}
        </button>
      );
  }

  createGoToIndexElement(min, max) {
    // since number inputs don't use the 'size' attribute, dynamically adjust width based on maximum index.
    const style = {
      width: `${0.65 * this.props.maxIndex.toString().length}em`,
    };

    return (
      <form key={min} onSubmit={this.handleGoToIndex}>
        <input
          className={`${styles.index} ${styles.goToIndex}`}
          style={style}
          name="goto"
          type="number"
          min={min}
          max={max}
          step={1}
          placeholder="..."
          onBlur={(e) => { e.target.value = ''; }}
        />
      </form>
    );
  }

  generateIndices() {
    const indices = [];
    const numIndices = this.props.maxIndex - this.props.minIndex;
    if (this.props.maxIndicesToDisplay && (numIndices > this.props.maxIndicesToDisplay)) {
      const adjacentIndicesToDisplay = this.props.adjacentIndicesToDisplay || 1;

      // add min index and its adjacent indices.
      for (let i = this.props.minIndex; i <= Math.min(this.props.minIndex + adjacentIndicesToDisplay, this.props.maxIndex); ++i) {
        indices.push(this.createIndexElement(i));
      }

      // add goto ellipsis for indices leading up to the current index.
      const lowerGoToIndexRange = ((this.props.index - adjacentIndicesToDisplay) - (this.props.minIndex + adjacentIndicesToDisplay)) - 1;
      if (lowerGoToIndexRange > 0) {
        indices.push(lowerGoToIndexRange > 1
          ? this.createGoToIndexElement(this.props.minIndex + adjacentIndicesToDisplay + 1, (this.props.index - adjacentIndicesToDisplay) - 1)
          : this.createIndexElement(this.props.minIndex + adjacentIndicesToDisplay + 1));
      }

      // add current index and its adjacent indices.
      for (let i = Math.max(this.props.minIndex + adjacentIndicesToDisplay + 1, this.props.index - adjacentIndicesToDisplay); i <= Math.min(this.props.index + adjacentIndicesToDisplay, this.props.maxIndex); ++i) {
        indices.push(this.createIndexElement(i));
      }

      // add goto ellipsis for indices leading up to the max index.
      const upperGoToIndexRange = ((this.props.maxIndex - adjacentIndicesToDisplay) - (this.props.index + adjacentIndicesToDisplay)) - 1;
      if (upperGoToIndexRange > 0) {
        indices.push(upperGoToIndexRange > 1
          ? this.createGoToIndexElement(this.props.index + adjacentIndicesToDisplay + 1, (this.props.maxIndex - adjacentIndicesToDisplay) - 1)
          : this.createIndexElement(this.props.index + adjacentIndicesToDisplay + 1));
      }

      // add max index and its adjacent indices.
      for (let i = Math.max(this.props.index + adjacentIndicesToDisplay + 1, this.props.maxIndex - adjacentIndicesToDisplay); i <= this.props.maxIndex; ++i) {
        indices.push(this.createIndexElement(i));
      }
    } else {
      for (let i = this.props.minIndex; i <= this.props.maxIndex; ++i) {
        indices.push(this.createIndexElement(i));
      }
    }

    return indices;
  }

  render() {
    return (
      <nav className={`${styles.footer} ${this.props.className}`}>
        {this.props.url
          ? (
            <Link className={styles.navButton} to={this.props.url.replace('{index}', Math.max(this.props.minIndex, this.props.index - 1))}>
              <PrevIcon className={styles.icon} />
            </Link>
          )
          : (
            <button type="button" className={styles.navButton}>
              <PrevIcon className={styles.icon} onClick={() => this.props.onIndexChange(Math.max(this.props.minIndex, this.props.index - 1))} />
            </button>
          )
        }
        <div className={styles.indices}>
          {this.generateIndices()}
        </div>
        {this.props.url
          ? (
            <Link className={styles.navButton} to={this.props.url.replace('{index}', Math.min(this.props.maxIndex, this.props.index + 1))}>
              <NextIcon className={styles.icon} />
            </Link>
          )
          : (
            <button type="button" className={styles.navButton}>
              <NextIcon className={styles.icon} onClick={() => this.props.onIndexChange(Math.min(this.props.maxIndex, this.props.index + 1))} />
            </button>
          )
        }
      </nav>
    );
  }
}

IndexSelector.propTypes = {
  url: (props, propName, componentName) => {
    if ((!props[propName] && !props.onIndexChange) || (props[propName] && props.onIndexChange)) {
      return new Error(`Invalid props '${propName}' and 'onIndexChange' supplied to ${componentName}. '${propName}' and 'onIndexChange' must be mutually exclusive.`);
    }
    if (props[propName] && (!(typeof props[propName] === 'string') && !(props[propName] instanceof String))) {
      return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be a string.`);
    }
  },
  onIndexChange: (props, propName, componentName) => {
    if ((!props[propName] && !props.url) || (props[propName] && props.url)) {
      return new Error(`Invalid props 'url' and '${propName}' supplied to ${componentName}. 'url' and '${propName}' must be mutually exclusive.`);
    }
    if (props[propName] && !(props[propName] instanceof Function)) {
      return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be a function.`);
    }
  },
  minIndex: (props, propName, componentName) => {
    if (!props[propName] || !Number.isInteger(props[propName]) || props[propName] < 0) {
      return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be an integer greater than zero.`);
    }
  },
  maxIndex: (props, propName, componentName) => {
    if (!props[propName] || !Number.isInteger(props[propName]) || props[propName] < props.minIndex) {
      return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be an integer greater or equal to 'minIndex'.`);
    }
  },
  index: (props, propName, componentName) => {
    if (!props[propName] || !Number.isInteger(props[propName]) || props[propName] < props.minIndex || props[propName] > props.maxIndex) {
      return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be an integer equal to or between 'minIndex' and 'maxIndex'.`);
    }
  },
  maxIndicesToDisplay: (props, propName, componentName) => {
    if (props[propName] && (!Number.isInteger(props[propName]) || props[propName] < 0)) {
      return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be an integer greater than zero.`);
    }
  },
  adjacentIndicesToDisplay: (props, propName, componentName) => {
    if (props[propName] && (!Number.isInteger(props[propName]) || props[propName] < 1)) {
      return new Error(`Invalid prop '${propName}' with value '${props[propName]}' supplied to ${componentName}. '${propName}' must be an integer greater than one.`);
    }
  },
};

export default withRouter(IndexSelector);
