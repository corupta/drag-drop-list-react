import React from 'react';
import PropTypes from 'prop-types';

const inputUpStyle = {
  background: 'none',
  border: 0,
  padding: 4,
  fontSize: '1.1em',
  fontWeight: 500,
  margin: 6,
  display: 'block',
  textAlign: 'center',
  width: 'calc(100% - 20px)'
};

const inputDownStyle = {
  background: 'none',
  border: 0,
  padding: 4,
  fontSize: '0.8em',
  margin: 0,
  display: 'block',
  textAlign: 'center',
  width: 'calc(100% - 8px)',
  resize: 'none'
};

const superNlToBrHack = {
  whiteSpace: 'pre-wrap'
};

export default class LongText extends React.Component {
  constructor(props){
    super(props);
    this.upContentUp = this.upContentUp.bind(this);
    this.upContentDown = this.upContentDown.bind(this);
  }
  componentDidMount() {
    if (this.props.editMode) {
      this.fixTextAreaHeight();
    }
  }
  fixTextAreaHeight() {
    const myTextarea = document.getElementById(`textarea_${this.props.myId}`);
    myTextarea.style.height = 'auto';
    myTextarea.style.height = myTextarea.scrollHeight - 2 * myTextarea.style.padding + 'px';
  }
  upContentUp(e) {
    this.props.upContent(this.props.myId, e.target.value, this.props.contentDown);
  }
  upContentDown(e) {
    this.props.upContent(this.props.myId, this.props.contentUp, e.target.value);
    this.fixTextAreaHeight();
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    if (this.props.editMode){
      return(
      <div>
        <input style={inputUpStyle} type='text' onChange={this.upContentUp} placeholder='Type something in this header of the long text.' defaultValue={this.props.contentUp} maxLength={20} />
        <textarea id={`textarea_${this.props.myId}`} rows='1' style={inputDownStyle} onChange={this.upContentDown} placeholder='Type something in the long text.' defaultValue={this.props.contentDown}></textarea>
      </div>
      );
    } else {
      return <div><h4>{this.props.contentUp}</h4><span style={superNlToBrHack}>{this.props.contentDown}</span></div>;
    }
  }
}

LongText.PropTypes = {
  contentUp: PropTypes.string.isRequired,
  contentDown: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  upContent: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  type: PropTypes.element.isRequired
};
