import React from 'react';
import PropTypes from 'prop-types';

const imgStyle = {
  minHeight: 18,
  minWidth: 24,
  maxHeight: 192,
  border: '1px red groove',
  padding: 4
};

const inputStyle = {
  background: 'none',
  border: 0,
  padding: 0,
  fontSize: '0.8em',
  margin: 2,
  display: 'block',
  textAlign: 'center',
  width: 'calc(100% - 4px)',
  textDecoration: 'underline',
  color: '#0000ee'
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
      return <img style={imgStyle} src={this.props.url} title={this.props.url === '' ? 'image' : this.props.url} alt={this.props.url === '' ? 'image' : this.props.url} />;
    }
  }
}

Image.PropTypes = {
  url: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};
