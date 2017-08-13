/**
 * Created by corupta on 20/07/17.
 */
/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class DragItem extends React.Component {
  constructor(props) {
    super(props);
    this.setMe = this.setMe.bind(this);
    this.unlockBlock = this.unlockBlock.bind(this);
    this.getMyStyle = this.getMyStyle.bind(this);
    this.focusLock = this.focusLock.bind(this);
    this.focusUnlock = this.focusUnlock.bind(this);
    this.getFocusLocker = this.getFocusLocker.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.moveFlyingItem = this.moveFlyingItem.bind(this);
    this.blocked = false;
    this.blockLocker = 0;
    this.prevH = 0;
    this.focusLocker = 0;
  }
  componentDidMount() {
    this.setMe();
  }
  componentDidUpdate() {
    this.setMe();
  }
  setMe() {
    const di = ReactDOM.findDOMNode(this);
    if (di !== null) {
      this.me = di;
      this.addEvents(di);
      const stl = window.getComputedStyle(di, null);
      this.leftMargin = parseFloat(stl.marginLeft, 10);
      this.topMargin = parseFloat(stl.marginTop, 10);
      this.width = parseFloat(stl.width, 10);
      this.height = parseFloat(stl.height, 10);
      this.props.setHeight(this.props.myId, stl);
    }
  }
  unlockBlock(blockLocker) {
    if (this.blockLocker === blockLocker) {
      this.blocked = false;
    }
  }
  getMyStyle() {
    const ans = (typeof this.props.children.props.style === 'undefined' ? {} : { ...this.props.children.props.style });
    if (this.props.destroyer) {
      ans.display = 'none';
      ans.touchAction = 'none';
      ans.pointerEvents = 'none';
    } else {
      if (this.props.trans.H !== 0) {
        ans.transform = `translate(0, ${this.props.trans.H}px)`;
        ans.WebkitTransform = `translate(0, ${this.props.trans.H}px)`;
      }
      if (this.prevH !== this.props.trans.H) {
        this.prevH = this.props.trans.H;
        this.blocked = true;
        const blockLocker = ++this.blockLocker;
        setTimeout(this.unlockBlock, this.props.trans.dur, blockLocker);
      }
      ans.transitionDuration = `${this.props.trans.dur}ms`;
      ans.WebkitTouchCallout = 'none';
      ans.WebkitUserSelect = 'none';
      ans.KhtmlUserSelect = 'none';
      ans.MozUserSelect = 'none';
      ans.MsUserSelect = 'none';
      ans.userSelect = 'none';
      ans.touchAction = 'none';
      ans.zIndex = 1;
    }
    return ans;
  }
  focusLock() {
    ++this.focusLocker;
  }
  focusUnlock() {
    --this.focusLocker;
  }
  getFocusLocker() {
    return this.focusLocker;
  }
  addEvents(di) {
    di.addEventListener('supermove', this.moveFlyingItem);
    di.addEventListener('enterMeh', this.handleEnter);
    di.addEventListener('focusin', this.focusLock);
    di.addEventListener('focusout', this.focusUnlock);
    if (window.PointerEvent) {
      di.addEventListener('pointerdown', this.handleDown);
    } else {
      di.addEventListener('mousedown', this.handleDown);
      di.addEventListener('touchstart', this.handleDown);
    }
  }
  handleDown(e) {
    const p = e.type === 'touchstart' || (e.type === 'pointerdown' && (e.pointerType === 'pen' || e.pointerType === 'touch'));
    const t = !p && (e.button === 0);
    if (p || t) {
      const getRect = this.me.getBoundingClientRect();
      const stl = {left: getRect.left, top: getRect.top};
      let rel;
      if (p) {
        rel = {left: stl.left - e.touches.item(0).clientX, top: stl.top - e.touches.item(0).clientY};
      } else {
        rel = {left: stl.left - e.clientX, top: stl.top - e.clientY};
      }
      this.props.setRelatives(stl, rel);
      this.props.onSthDown(this.props.myId, stl, p, e, this.me, {width: this.width, height: this.height}, this.getFocusLocker);
    }
  }
  handleEnter(e) {
    this.props.onSthEnter(this.props.myId);
    e.stopPropagation();
  }
  moveFlyingItem(e) {
    if (this.blocked === false) {
      const rect = this.me.getBoundingClientRect();
      this.props.onsupermove(this.me, this.props.myId, {top: rect.top, bottom: rect.bottom});
    }
    e.stopPropagation();
  }
  render() {
    //if (this.blocked) {
    //  console.log('blocked');
    //}
    return React.cloneElement(this.props.children, { style: this.getMyStyle(), className: (typeof this.props.class === 'undefined' ? '' : this.props.class) });
  }
}

DragItem.PropTypes = {
  setHeight: PropTypes.func.isRequired,
  willSetHeight: PropTypes.bool.isRequired,
  trans: PropTypes.shape().isRequired,
  setRelatives: PropTypes.func.isRequired,
  onSthDown: PropTypes.func.isRequired,
  onSthEnter: PropTypes.func.isRequired,
  onsupermove: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  myGid: PropTypes.number.isRequired,
  destroyer: PropTypes.bool.isRequired,
  class: PropTypes.string
};

