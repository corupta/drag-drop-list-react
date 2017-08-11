import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  display: 'block',
  margin: '4px auto',
  background: 'none',
  border: 'none',
  width: 'calc(100% - 30px)',
  textAlign: 'center',
  fontSize: 16
};

const addButtonStyle = {
  display: 'block',
  margin: '4px auto'
};

const clearButtonStyle = {
  display: 'block',
  margin: '4px auto'
};

export default class Input extends React.Component {
  constructor(props){
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleSend() {
    const input = document.getElementById(`getItemInput_${this.props.myGid}`);
    const item = input.value;
    input.value = '';
    this.props.pushItem(item, this.props.myGid);
    input.focus();
  }
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSend();
    }
  }
  handleClear() {
    this.props.removeList(this.props.myGid);
  }
  render() {
    return (
      <span style={ this.props.style }>
        <input onKeyDown={this.handleKeyDown} type='text' style={inputStyle} id={`getItemInput_${this.props.myGid}`} placeholder='Type an html item here.' />
        <button onClick={this.handleSend} style={addButtonStyle}>Add to List {this.props.myGid}</button>
        <button onClick={this.handleClear} style={clearButtonStyle}>Clear List {this.props.myGid}</button>
      </span>
    );
  }
}

Input.PropTypes = {
  myGid: PropTypes.number.isRequired,
  pushItem: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  style: PropTypes.shape().isRequired
};
