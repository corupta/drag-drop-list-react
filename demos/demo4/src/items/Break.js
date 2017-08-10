import React from 'react';
import PropTypes from 'prop-types';

const breakStyle = {
  border: 0,
  height: 0,
  padding: 0,
  boxShadow: '0 0 8px 1.2px black'
};

export default class Break extends React.Component {
  render() {
    return <hr style={breakStyle} />;
  }
}

Break.PropTypes = {
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};