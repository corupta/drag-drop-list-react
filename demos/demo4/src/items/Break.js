import React from 'react';
import PropTypes from 'prop-types';

export default class Break {
  render() {
    return <hr />;
  }
}

Break.PropTypes = {
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired
};