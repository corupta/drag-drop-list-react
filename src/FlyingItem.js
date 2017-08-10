import React from 'react';
import PropTypes from 'prop-types';

export default class FlyingItem extends React.Component {
  constructor(props) {
    super(props);
    this.readyProps = this.readyProps.bind(this);
  }
  readyProps() {
    const ans = { ...this.props.children.props.style };
    ans.width = this.props.elemDimensions.width;
    ans.height = this.props.elemDimensions.height;
    ans.opacity = '0.6';
    ans.marginLeft = 0;
    ans.marginBottom = 0;
    ans.marginRight = 0;
    ans.marginTop = 0;
    ans.pointerEvents = 'none';
    ans.touchAction = 'none';
    ans.position = 'fixed';
    if (this.props.rotate) {
      ans.transform = `rotate(6deg)`;
    }
    /*
    ans.top = 0;
    ans.left = 0;
    ans.transform = `translate(${this.props.left}px, ${this.props.top}px)`;
    ans.WebkitTransform = `translate(${this.props.left}px, ${this.props.top}px)`;
    */
    ans.top = this.props.top;
    ans.left = this.props.left;
    ans.zIndex = 999;
    return { style: ans, className: (typeof this.props.class === 'undefined' ? '' : this.props.class) };
  }
  render() {
    return React.cloneElement(this.props.children, this.readyProps());
  }
}

FlyingItem.PropTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  elemDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  rotate: PropTypes.bool.isRequired,
  class: PropTypes.string
};
