import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  display: 'block',
  zIndex: 50
};

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.upContent = this.upContent.bind(this);
  }
  upContent(e) {
    console.log('upcon');
    this.props.upContent(this.props.myId, e.target.value, '');
  }
  render() {
    if (this.props.editMode){
      return <input style={inputStyle} type='text' onChange={this.upContent} placeholder='Type something in this header.' defaultValue={this.props.content} />;
    } else {
      return <h2>{this.props.content}</h2>;
    }
  }
}

Header.PropTypes = {
  content: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired
};