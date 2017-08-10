import React from 'react';
import PropTypes from 'prop-types';


export default class BuildBreak extends React.Component {
  render() {
    return <h1>Break</h1>;
  }
}

BuildBreak.PropTypes = {
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};