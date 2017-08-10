import React from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
  padding: 8,
  margin: 4,
  borderRadius: 8,
  color: '#ffede6',
  background: '#9f6914'
};

export default class SwitchButton extends React.Component {
  render() {
    return <button style={buttonStyle} onClick={this.props.switchMode}>{ this.props.editMode ? 'Back To Profile' : 'Edit Profile' }</button>;
  }
}

SwitchButton.PropTypes = {
  editMode: PropTypes.bool.isRequired,
  switchMode: PropTypes.func.isRequired
};
