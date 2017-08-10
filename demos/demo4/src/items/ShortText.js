import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  background: 'none',
  border: 0,
  padding: 0,
  fontSize: '0.9em',
  margin: 4,
  display: 'block',
  textAlign: 'center',
  width: 'calc(100% - 8px)'
};

export default class ShortText extends React.Component {
  constructor(props){
    super(props);
    this.upContent = this.upContent.bind(this);
  }
  upContent(e) {
    this.props.upContent(this.props.myId, e.target.value, '');
  }
  render() {
    if (this.props.editMode){
      return <input style={inputStyle} type='text' onChange={this.upContent} placeholder='Type something in this text.' defaultValue={this.props.content} maxLength='30'/>;
    } else {
      return <p>{this.props.content}</p>;
    }
  }
}

ShortText.PropTypes = {
  content: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};