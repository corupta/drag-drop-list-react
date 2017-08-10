import React from 'react';
import PropTypes from 'prop-types';

export default class BuildShortText  extends React.Component {
  render () {
    return <h1>Short Text</h1>;
  }
}


BuildShortText.PropTypes = {
  content: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};

