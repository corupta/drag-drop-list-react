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

const hrStyle = {
  height: 2,
  borderWidth: 0,
  color: 'currentColor',
  backgroundColor: 'currentColor'
};

export default class DragDrop extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    const topElemSticks = typeof nextProps.topElemSticks === 'undefined' ? true : nextProps.topElemSticks;
    const bottomElemSticks = typeof nextProps.bottomElemSticks === 'undefined' ? true : nextProps.bottomElemSticks;
    this.topElem = null;
    this.innerTopElem = null;
    if (typeof nextProps.topElem !== 'undefined' ) {
      const topElem = <div style={{ width: '100%', marginBottom: 'auto' }}>{nextProps.topElem}<hr style={{...hrStyle, marginTop: 0}}/></div>;
      if (topElemSticks) {
        this.topElem = topElem;
      } else {
        this.innerTopElem = topElem;
      }
    }
    this.bottomElem = null;
    this.innerBottomElem = null;
    if (typeof nextProps.bottomElem !== 'undefined') {
      const bottomElem = <div style={{width: '100%', marginTop: 'auto' }}><hr style={{...hrStyle, marginBottom: 0}} />{nextProps.bottomElem}</div>;
      if (bottomElemSticks) {
        this.bottomElem = bottomElem
      } else {
        this.innerBottomElem = bottomElem;
      }
    }
    this.style = {};
    if (typeof nextProps.style !== 'undefined') {
      if (typeof nextProps.style.overflow !== 'undefined') {
        this.style.overflow = nextProps.style.overflow;
      }
      if (typeof nextProps.style.overflowX !== 'undefined') {
        this.style.overflowX = nextProps.style.overflowX;
      }
      if (typeof nextProps.style.overflowY !== 'undefined') {
        this.style.overflowY = nextProps.style.overflowY;
      }
    }
    this.myStyle = (typeof nextProps.style !== 'undefined' ? { ...nextProps.style } : {});
    this.myStyle.overflow = 'hidden';
    this.myStyle.overflowX = 'hidden';
    this.myStyle.overflowY = 'hidden';
  }
  render() {
    const tag = (typeof this.props.tag === 'undefined' ? 'div' : this.props.tag);
    return React.createElement(tag, { style: this.myStyle, className: (this.props.class === 'undefined' ? '' : this.props.class) },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', height: '100%', width: '100%', flexDirection: 'column'} },
        this.topElem !== null && this.topElem,
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
          topElem={this.innerTopElem}
          bottomElem={this.innerBottomElem}
          scrollWhen={this.props.scrollWhen}
          scrollSpeed={this.props.scrollSpeed}
          delayOnTouch={this.props.delayOnTouch}
          delayOnMouse={this.props.delayOnMouse}
          rotateFlying={this.props.rotateFlying}
        >
          {this.props.children}
        </DragList>
        ),
        this.bottomElem !== null && this.bottomElem
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
  topElem: PropTypes.element,
  bottomElem: PropTypes.element,
  topElemSticks: PropTypes.bool,
  bottomElemSticks: PropTypes.bool,
  scrollWhen: PropTypes.number,
  scrollSpeed: PropTypes.number,
  delayOnTouch: PropTypes.number,
  delayOnMouse: PropTypes.number,
  rotateFlying: PropTypes.bool
};

DragList.defaultProps = {
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
