import React from 'react';
import PropTypes from 'prop-types';

export default class BuildHeader extends React.Component {
  render () {
    return <h1>Header</h1>;
  }
}

BuildHeader.PropTypes = {
  content: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};
