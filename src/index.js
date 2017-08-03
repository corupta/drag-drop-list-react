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
    this.getMyStyle = this.getMyStyle.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.moveFlyingItem = this.moveFlyingItem.bind(this);
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
  getMyStyle() {
    const ans = (typeof this.props.children.props.style === 'undefined' ? {} : { ...this.props.children.props.style });
    if (this.props.trans.H !== 0) {
      ans.transform = `translate(0, ${this.props.trans.H}px)`;
      ans.WebkitTransform = `translate(0, ${this.props.trans.H}px)`;
    }
    ans.transitionDuration = `${this.props.trans.dur}ms`;
    ans.userSelect = 'none';
    if (this.props.destroyer) {
      ans.display = 'none';
      ans.touchAction = 'none';
      ans.pointerEvents = 'none';
    }
    return ans;
  }
  addEvents(di) {
    di.addEventListener('supermove', this.moveFlyingItem);
    di.addEventListener('enterMeh', this.handleEnter);
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
      e.preventDefault();
      e.stopPropagation();
      const getRect = this.me.getBoundingClientRect();
      const stl = { left: getRect.left, top: getRect.top };
      let rel;
      if (p) {
        rel = { left: stl.left - e.touches.item(0).clientX, top: stl.top - e.touches.item(0).clientY };
      } else {
        rel = { left: stl.left - e.clientX, top: stl.top - e.clientY };
      }
      this.props.setRelatives(rel);
      this.props.onSthDown(this.props.myId, stl, p, e, this.me,  { width: this.width, height: this.height });
    }
  }
  handleEnter(e) {
    this.props.onSthEnter(this.props.myId);
    e.stopPropagation();
  }
  moveFlyingItem(e) {
    this.props.onsupertouchmove(this.me);
    e.stopPropagation();
  }
  render() {
    return React.cloneElement(this.props.children, { style: this.getMyStyle() });
  }
}

DragItem.PropTypes = {
  setHeight: PropTypes.func.isRequired,
  willSetHeight: PropTypes.bool.isRequired,
  trans: PropTypes.shape().isRequired,
  setRelatives: PropTypes.func.isRequired,
  onSthDown: PropTypes.func.isRequired,
  onSthEnter: PropTypes.func.isRequired,
  onsupertouchmove: PropTypes.func.isRequired,
  myId: PropTypes.number.isRequired,
  myGid: PropTypes.number.isRequired,
  destroyer: PropTypes.bool.isRequired,
};

