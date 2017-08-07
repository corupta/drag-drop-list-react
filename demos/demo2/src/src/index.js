/**
 * Created by corupta on 20/07/17.
 */
/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';

import DragList from './DragList';

let lastKey = 0;

export function getKey() {
  return `xyq_${lastKey++}`;
}

export default class DragDrop extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.upperElem !== 'undefined') {
      this.upperElem = <div style={{ width: '100%', display: 'table' }}>{nextProps.upperElem}<hr /></div>;
    } else if (typeof this.upperElem === 'undefined') {
      this.upperElem = null;
    }
    if (typeof nextProps.bottomElem !== 'undefined') {
      this.bottomElem = <div style={{ width: '100%', display: 'table' }}><hr />{nextProps.bottomElem}</div>;
    } else if (typeof this.bottomElem === 'undefined') {
      this.bottomElem = null;
    }
    this.style = {};
    if (typeof this.props.style !== 'undefined') {
      if (typeof this.props.style.overflow !== 'undefined') {
        this.style.overflow = this.props.style.overflow;
      }
      if (typeof this.props.style.overflowX !== 'undefined') {
        this.style.overflowX = this.props.style.overflowX;
      }
      if (typeof this.props.style.overflowY !== 'undefined') {
        this.style.overflowY = this.props.style.overflowY;
      }
    }
    this.myStyle = (typeof this.props.style !== 'undefined' ? { ...this.props.style } : {});
    this.myStyle.overflow = 'hidden';
    this.myStyle.overflowX = 'hidden';
    this.myStyle.overflowY = 'hidden';
  }
  render() {
    const tag = (typeof this.props.tag === 'undefined' ? 'div' : this.props.tag);
    return React.createElement(tag, { style: this.myStyle },
      React.createElement('div', { style: { display: 'flex', height: '100%', width: '100%', justifyContent: 'space-between', flexDirection: 'column'} },
        typeof this.upperElem !== 'undefined' && this.upperElem,
        (
        <DragList
          myGid={this.props.myGid}
          dragName={this.props.dragName}
          dropName={this.props.dropName}
          removeItem={this.props.removeItem}
          insertItem={this.props.insertItem}
          dropFunc={this.props.dropFunc}
          style={this.style}
          animationDuration={this.props.animationDuration}
          class={this.props.class}
          scrollWhen={this.props.scrollWhen}
          scrollSpeed={this.props.scrollSpeed}
          delayOnTouch={this.props.delayOnTouch}
          delayOnMouse={this.props.delayOnMouse}
          rotateFlying={this.props.rotateFlying}
        >
          {this.props.children}
        </DragList>
        ),
        typeof this.bottomElem !== 'undefined' && this.bottomElem
      )
    );
  }
}

DragList.PropTypes = {
  myGid: PropTypes.number.isRequired,
  dragName: PropTypes.string,
  dropName: PropTypes.string,
  removeItem: PropTypes.func,
  insertItem: PropTypes.func,
  dropFunc: PropTypes.func,
  style: PropTypes.shape(),
  animationDuration: PropTypes.func,
  class: PropTypes.string,
  upperElem: PropTypes.element,
  bottomElem: PropTypes.element,
  scrollWhen: PropTypes.number,
  scrollSpeed: PropTypes.number,
  delayOnTouch: PropTypes.number,
  delayOnMouse: PropTypes.number,
  rotateFlying: PropTypes.bool
};

DragList.defaultProps = {
  clone: false,
  dragName: '',
  dropName: '',
  animationDuration: 250,
  scrollWhen: 48,
  scrollSpeed: 1.0,
  // at least 12 or you are probably going to have some issues on mobile devices
  delayOnTouch: 400,
  delayOnMouse: 0,
  rotateFlying: true
};
/*
clone: true => clone
ondragend do nothing

both
ondrop -> reH: true

clone: false => move item to out of bounds
ondragend if drop succesfull => remove item, recalculate itemHeights automagically

(minus)blankH if more than blank
(minus)draggedH if more than draggedId

ondragleave removes the blank so no need to remove blank ever again
 */
