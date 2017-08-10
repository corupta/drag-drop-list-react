import React from 'react';
import PropTypes from 'prop-types';

export default class BuildImage extends React.Component {
  render () {
    return <h1>Image</h1>;
  }
}

BuildImage.PropTypes = {
  url: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};
