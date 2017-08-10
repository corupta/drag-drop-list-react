import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {

};

const addButtonStyle = {

};

const clearButtonStyle = {

};

export default class Input extends React.Component {
  constructor(props){
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  handleClick() {
    this.props.removeList(this.props.myGid);
  }
  render() {
    return (
      <span>
        <input onKeyDown={this.handleKeyDown} type='text' style={inputStyle} id={`getItemInput_${this.props.myGid}`} placeholder='Type an html item here.' />
        <button onClick={this.handleSend} style={addButtonStyle}>Add to List {this.props.myGid}</button>
        <button style={clearButtonStyle}>Clear List {this.props.myGid}</button>
      </span>
    );
  }
}

Input.PropTypes = {
  myGid: PropTypes.number.isRequired,
  pushItem: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired
};
