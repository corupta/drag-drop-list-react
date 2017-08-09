import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  display: 'block'
};

export default class LongText extends React.Component {
  constructor(props){
    super(props);
    this.upContentUp = this.upContentUp.bind(this);
    this.upContentDown = this.upContentDown.bind(this);
  }
  upContentUp(e) {
    this.props.upContent(this.props.myId, e.target.value, this.props.contentDown);
  }
  upContentDown(e) {
    this.props.upContent(this.props.myId, this.props.contentUp, e.target.value);
  }
  render() {
    if (this.props.editMode){
      return(
      <div>
        <input style={inputStyle} type='text' onChange={this.upContentUp} placeholder='Type something in this header of the long text.' defaultValue={this.props.contentUp} />
        <input style={inputStyle} type='text' onChange={this.upContentDown} placeholder='Type something in the long text.' defaultValue={this.props.contentDown} />
      </div>
      );
    } else {
      return <span><h3>{this.props.contentUp}</h3>{this.props.contentDown}</span>;
    }
  }
}

LongText.PropTypes = {
  contentUp: PropTypes.string.isRequired,
  contentDown: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired
};