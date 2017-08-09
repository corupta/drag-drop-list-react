import React from 'react';
import PropTypes from 'prop-types';

const imgStyle = {

};

const inputStyle = {

};

export default class Image extends React.Component {
  constructor(props){
    super(props);
    this.upContent = this.upContent.bind(this);
  }
  upContent(e) {
    this.props.upContent(this.props.myId, e.target.value, '');
  }
  render() {
    if (this.props.editMode){
      return <input style={inputStyle} type='text' onChange={this.upContent} placeholder='Type an url for the image.' defaultValue={this.props.url} />;
    } else {
      return <img style={imgStyle} src={this.props.url} alt={this.props.url} />;
    }
  }
}

Image.PropTypes = {
  url: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired
};