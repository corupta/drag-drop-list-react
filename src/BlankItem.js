import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class BlankItem extends React.Component {
  constructor(props) {
    super(props);
    this.fixMe = this.fixMe.bind(this);
    this.getBlankStyle = this.getBlankStyle.bind(this);
  }
  componentDidMount() {
    this.fixMe();
  }
  componentDidUpdate() {
    this.fixMe();
  }
  fixMe() {
    const di = ReactDOM.findDOMNode(this);
    if (di !== null) {
      this.props.fixH(di);
    }
  }
  getBlankStyle() {
    const myStyle = {
      filter: 'greyscale(100%)',
      opacity: '0.3',
      transform: `translate(0px,${this.props.trans}px)`,
      WebkitTransform: `translate(0px,${this.props.trans}px)`,
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
  trans: PropTypes.number.isRequired,
  fixH: PropTypes.func.isRequired
};

BlankItem.defaultProps = {

};
