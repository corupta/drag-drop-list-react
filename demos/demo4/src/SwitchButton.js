import React from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
};

export default class SwitchButton extends React.Component {
  render() {
    return <button style={this.buttonStyle} onClick={this.props.switchMode}>{ this.props.editMode ? 'Back To Profile' : 'Edit Profile' }</button>;
  }
}

SwitchButton.PropTypes = {
  editMode: PropTypes.bool.isRequired,
  switchMode: PropTypes.func.isRequired
};
