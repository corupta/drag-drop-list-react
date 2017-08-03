import React from 'react';
import PropTypes from 'prop-types';

export default class BlankItem extends React.Component {
  constructor(props) {
    super(props);
    this.getBlankStyle = this.getBlankStyle.bind(this);
  }
  getBlankStyle() {
    const myStyle = {
      filter: 'greyscale(100%)',
      opacity: '0.3',
      transform: `translate(0px,${this.props.trans}px)`,
      WebkitTransform: `translate(0px,${this.props.trans}px)`,
      zIndex: -1,
      pointerEvents: 'none',
      touchAction: 'none'
    };
    return myStyle;
  }
  render() {
    const _style = { ...this.props.children.props.style, ...this.getBlankStyle() };
    return React.cloneElement(this.props.children, { style: _style });
  }
}

BlankItem.PropTypes = {
  trans: PropTypes.number.isRequired
};

BlankItem.defaultProps = {

};
