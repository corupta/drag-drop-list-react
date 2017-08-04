/**
 * Created by corupta on 20/07/17.
 */
/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';

import DragItem from './DragItem';
import BlankItem from './BlankItem';
import FlyingItem from './FlyingItem';

let lastKey = 0;

export function getKey() {
  return `xyq_${lastKey++}`;
}

let dragData = {
  item: null,
  itemDimensions: {
    width: 42,
    height: 42
  },
  dragName: '',
  mySpecs: {
    height: 42,
    marginTop: 42,
    maginBottom: 42
  },
  relativeX: 42,
  relativeY: 42,
  target: null,
  isTouchOrMouse: false, //touch for true, mouse for false
  ePos: {
    x: 42,
    y: 42
  },
  currList: -1,
  upState: null
};

const defaultScrollStep = 24;

const scrollDetails = {
  step: -1,
  time: 32
};

let scrollBugFix = true;

export default class DragList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flying: null,
      currX: -1,
      currY: -1
    };
    this.initVariables();
    this.initializeBindings();
  }
  componentDidMount() {
    if (scrollBugFix) {
      scrollBugFix = false;
      // fixes ios chrome not scrolling initally bug !!! --WEIRD!!!
      setTimeout(() => { window.scrollTo(0, 1); window.scrollTo(0, 0); }, 4);
    }
  }
  componentWillReceiveProps() {
    this.itemHeights = [];
    this.itemMarginTops = [];
    this.itemMarginBottoms = [];
    scrollDetails.step = Math.round(defaultScrollStep * this.props.scrollSpeed);
  }
  getListProps() {
    const ans = { ref: this.addEvents };
    if (typeof this.props.style !== 'undefined') {
      ans.style = { ...this.props.style };
    }
    if (typeof this.props.class !== 'undefined') {
      ans.class = this.props.class;
    }
    return ans;
  }
  setHeight(id, stl) {
    this.itemHeights[id] = parseFloat(stl.height, 10) + parseFloat(stl.borderBottom, 10) + parseFloat(stl.borderTop, 10);
    this.itemMarginTops[id] = parseFloat(stl.marginTop, 10);
    this.itemMarginBottoms[id] = parseFloat(stl.marginBottom, 10);
  }
  initVariables() {
    this.blank = null;
    this.blankHeight = 42;
    this.blocker = -1;
    this.itemHeights = [];
    this.itemMarginTops = [];
    this.itemMarginBottoms = [];
    this.blankH = -1;
    this.draggedId = -1;
    this.transitionDuration = this.props.animationDuration;
    this.downNo = 0;
    this.initalElem = null;
  }
  initializeBindings() {
    this.setHeight = this.setHeight.bind(this);
    this.getListProps = this.getListProps.bind(this);
    this.changeBlank = this.changeBlank.bind(this);
    this.handleEnterList = this.handleEnterList.bind(this);
    this.handleEnterItem = this.handleEnterItem.bind(this);
    this.handleLeaveList = this.handleLeaveList.bind(this);
    this.removeFlying = this.removeFlying.bind(this);
    this.removeFlyingHax = this.removeFlyingHax.bind(this);
    this.removeFlyingDoubleHax = this.removeFlyingDoubleHax.bind(this);
    this.removeFlyingTripleHax = this.removeFlyingTripleHax.bind(this);
    this.maybeScrollPage = this.maybeScrollPage.bind(this);
    this.maybeScrollList = this.maybeScrollList.bind(this);
    this.startScrollInterval = this.startScrollInterval.bind(this);
    this.moveFlying = this.moveFlying.bind(this);
    this.moveFlyingBody = this.moveFlyingBody.bind(this);
    this.moveFlyingScrollList = this.moveFlyingScrollList.bind(this);
    this.moveFlyingList = this.moveFlyingList.bind(this);
    this.moveFlyingBodyHax = this.moveFlyingBodyHax.bind(this);
    this.moveFlyingBodyDoubleHax = this.moveFlyingBodyDoubleHax.bind(this);
    this.maxOutTransitionDuration = this.maxOutTransitionDuration.bind(this);
    this.handleStartEvents = this.handleStartEvents.bind(this);
    this.calculateBlankHeight = this.calculateBlankHeight.bind(this);
    this.calculateBlankH = this.calculateBlankH.bind(this);
    this.handleStartContinue = this.handleStartContinue.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.dropCallback = this.dropCallback.bind(this);
    this.drop = this.drop.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.setState = this.setState.bind(this);
  }
  changeBlank(id) {
    this.maxOutTransitionDuration();
    this.blocker = id;
    this.blankHeight = this.calculateBlankHeight((this.draggedId === id - 1 ? id - 2 : id - 1), id);
    this.blankH = this.calculateBlankH(id);
    this.setState({});
  }
  handleEnterList() {
    if (dragData.item !== null && dragData.dragName === this.props.dropName) {
      if (this.blocker === -1) {
        if (this.blank === null) {
          this.blank = (typeof this.props.dropFunc === 'undefined' ? dragData.item : this.props.dropFunc(this.props.myGid, dragData.item));
        }
        this.changeBlank(this.props.children.length);
      }
    }
  }
  handleEnterItem(id) {
    if (dragData.item !== null && dragData.dragName === this.props.dropName) {
      let newId = id;
      if (this.blocker <= newId) {
        ++newId;
      }
      if (this.blocker !== newId) {
        if (this.blank === null) {
          this.blank = (typeof this.props.dropFunc === 'undefined' ? dragData.item : this.props.dropFunc(this.props.myGid, dragData.item));
        }
        this.changeBlank(newId);
      }
    }
  }
  handleLeaveList() {
    if (dragData.item !== null && dragData.dragName === this.props.dropName) {
      if (this.blank !== null) {
        this.blank = null;
        this.blocker = -1;
        this.blankH = -1;
        this.setState({});
      }
    }
  }
  removeFlying() {
    this.draggedId = -1;
    window.removeEventListener('supermove', this.moveFlyingBody);
    window.removeEventListener('superend', this.removeFlying);
    if (window.PointerEvent) {
      window.removeEventListener('pointerup', this.removeFlyingHax);
      window.removeEventListener('pointermove', this.moveFlyingBodyHax);
    } else {
      window.removeEventListener('mouseup', this.removeFlyingHax);
      window.removeEventListener('touchend', this.removeFlyingHax);
      window.removeEventListener('mousemove', this.moveFlyingBodyHax);
      window.removeEventListener('touchmove', this.moveFlyingBodyHax);
    }
    dragData = {
      item: null,
      dragName: '',
      blankHeight: -1,
      scrollPage: {
        left: false,
        up: false,
        right: false,
        down: false
      }
    };
    if (this.state.flying !== null) {
      this.setState({
        flying: null,
        currX: -1,
        currY: -1
      });
    }
  }
  removeFlyingHax(e) {
    if (dragData.isTouchOrMouse || e.button === 0) {
      e.preventDefault();
      e.stopPropagation();
      if (document.elementFromPoint(dragData.ePos.x, dragData.ePos.y) === null) {
        this.removeFlying();
      } else {
        document.elementFromPoint(dragData.ePos.x, dragData.ePos.y).dispatchEvent(new Event('superend', {bubbles: true}));
      }
    }
  }
  removeFlyingDoubleHax() {
    ++this.downNo;
    dragData.initalElem.removeEventListener('overMeh', this.handleOverInitial);
    window.removeEventListener('overMeh', this.removeFlyingDoubleHax);
    if (window.PointerEvent) {
      window.removeEventListener('pointermove', this.moveFlyingBodyDoubleHax);
      window.removeEventListener('pointerup', this.removeFlyingTripleHax);
    } else {
      window.removeEventListener('touchmove', this.moveFlyingBodyDoubleHax);
      window.removeEventListener('mousemove', this.moveFlyingBodyDoubleHax);
      window.removeEventListener('touchup', this.removeFlyingTripleHax);
      window.removeEventListener('mouseup', this.removeFlyingTripleHax);
    }
  }
  removeFlyingTripleHax(e) {
    if (dragData.isTouchOrMouse || e.button === 0) {
      this.removeFlyingDoubleHax();
    }
  }
  maybeScrollPage() {
    const currX = Math.round(window.scrollX || window.pageXOffset);
    const currY = Math.round(window.scrollY || window.pageYOffset);
    const pageH = document.documentElement.scrollHeight - window.innerHeight;
    const pageW = document.documentElement.scrollWidth - window.innerWidth;
    if (dragData.ePos.x - this.props.scrollWhen < 0) {
      window.scrollTo(Math.max(0, currX - scrollDetails.step), currY);
    }
    if (dragData.ePos.y - this.props.scrollWhen < 0) {
      window.scrollTo(currX, Math.max(0, currY - scrollDetails.step));
    }
    if (dragData.ePos.x + this.props.scrollWhen > window.innerWidth) {
      window.scrollTo(Math.min(pageW, currX + scrollDetails.step), currY);
    }
    if (dragData.ePos.y + this.props.scrollWhen > window.innerHeight) {
      window.scrollTo(currX, Math.min(pageH, scrollDetails.step + currY));
    }
  }
  maybeScrollList() {
    const getRect = this.me.getBoundingClientRect();
    const realStl = {
      left: getRect.left - this.leftMargin,
      top: getRect.top - this.topMargin,
      right: getRect.right - this.rightMargin,
      bottom: getRect.bottom - this.bottomMargin
    };
    if (dragData.ePos.x - this.props.scrollWhen < realStl.left) {
      this.me.scrollLeft = Math.max(0, this.me.scrollLeft - scrollDetails.step);
    }
    if (dragData.ePos.y - this.props.scrollWhen < realStl.top) {
      this.me.scrollTop = Math.max(0, this.me.scrollTop - scrollDetails.step);
    }
    if (dragData.ePos.x + this.props.scrollWhen > realStl.right) {
      this.me.scrollLeft = Math.min(this.me.scrollWidth, this.me.scrollLeft + scrollDetails.step);
    }
    if (dragData.ePos.y + this.props.scrollWhen > realStl.bottom) {
      this.me.scrollTop = Math.min(this.me.scrollHeight, this.me.scrollTop + scrollDetails.step);
    }
  }
  startScrollInterval() {
    if (dragData.item !== null) {
      if (dragData.scrollListCallback !== null) {
        dragData.scrollListCallback();
      }
      this.maybeScrollPage();
      dragData.upState({
        currX: dragData.ePos.x + dragData.relativeX,
        currY: dragData.ePos.y + dragData.relativeY
      });
      setTimeout(this.startScrollInterval, scrollDetails.time);
    }
  }
  moveFlying(item, listScrollCallback, newListId) {
    if (dragData.currList !== newListId) {
      if (dragData.currList !== -1) {
        dragData.target.dispatchEvent(new Event('leaveMeh', { bubbles: true }));
      }
      dragData.currList = newListId;
      dragData.scrollListCallback = listScrollCallback;
    }
    if (dragData.target !== item) {
      dragData.target = item;
      if (dragData.target !== null) {
        dragData.target.dispatchEvent(new Event('enterMeh', { bubbles: true }));
      }
    }
  }
  moveFlyingBody() {
    this.moveFlying(null, null, -1);
  }
  moveFlyingScrollList(elem) {
    this.moveFlying(elem, this.maybeScrollList, this.props.myGid);
  }
  moveFlyingList(e) {
    this.moveFlyingScrollList(this.me);
    e.stopPropagation();
  }
  moveFlyingBodyHax(e) {
    if (dragData.item !== null) {
      dragData.ePos = (dragData.isTouchOrMouse ? { x: e.touches.item(0).clientX, y: e.touches.item(0).clientY } : { x: e.clientX, y: e.clientY });
      e.preventDefault();
      e.stopPropagation();
      if (document.elementFromPoint(dragData.ePos.x, dragData.ePos.y) === null) {
        this.moveFlyingBody();
      } else {
        document.elementFromPoint(dragData.ePos.x, dragData.ePos.y).dispatchEvent(new Event('supermove', { bubbles: true }));
      }
    }
  }
  moveFlyingBodyDoubleHax(e) {
    dragData.ePos = (dragData.isTouchOrMouse ? { x: e.touches.item(0).clientX, y: e.touches.item(0).clientY } : { x: e.clientX, y: e.clientY });
    const elem = document.elementFromPoint(dragData.ePos.x, dragData.ePos.y);
    if (elem === null) {
      this.removeFlyingDoubleHax();
    } else {
      elem.dispatchEvent(new Event('overMeh', { bubbles: true }));
    }
  }
  maxOutTransitionDuration() {
    this.transitionDuration = this.props.animationDuration;
  }
  handleStartEvents() {
    window.addEventListener('supermove', this.moveFlyingBody);
    window.addEventListener('superend', this.removeFlying);
    if (window.PointerEvent) {
      window.removeEventListener('pointerup', this.removeFlyingTripleHax);
      window.addEventListener('pointerup', this.removeFlyingHax);
      window.removeEventListener('pointermove', this.moveFlyingBodyDoubleHax);
      window.addEventListener('pointermove', this.moveFlyingBodyHax);
    } else {
      window.removeEventListener('mouseup', this.removeFlyingTripleHax);
      window.removeEventListener('touchend', this.removeFlyingTripleHax);
      window.addEventListener('mouseup', this.removeFlyingHax);
      window.addEventListener('touchend', this.removeFlyingHax);
      window.removeEventListener('mousemove', this.moveFlyingBodyDoubleHax);
      window.removeEventListener('touchmove', this.moveFlyingBodyDoubleHax);
      window.addEventListener('mousemove', this.moveFlyingBodyHax);
      window.addEventListener('touchmove', this.moveFlyingBodyHax);
    }
  }
  calculateBlankH(id) {
    if (id === this.props.children.length) {
      return 0;
    }
    let prevId = this.props.children.length - 1;
    if (prevId === this.draggedId) {
      --prevId;
    }
    let ans = -Math.max((prevId < 0 ? 0 : this.itemMarginBottoms[prevId]), dragData.mySpecs.marginTop);
    for (let i = id; i < this.props.children.length; ++i) {
      if (i !== this.draggedId) {
        ans -= this.itemHeights[i];
        let prevI = i - 1;
        if (prevI === this.draggedId) {
          --prevI;
        }
        ans -= Math.max((prevI < 0 ? 0 : this.itemMarginBottoms[prevI]), this.itemMarginTops[i]);
      }
    }
    prevId = id - 1;
    if (prevId === this.draggedId) {
      --prevId;
    }
    ans += Math.max((prevId < 0 ? 0 : this.itemMarginBottoms[prevId]), dragData.mySpecs.marginTop);
    return ans;
  }
  calculateBlankHeight(prevId, nextId) {
    let ans = dragData.mySpecs.height;
    ans -= Math.max((prevId >= 0 ? this.itemMarginBottoms[prevId] : 0), (nextId < this.props.children.length ? this.itemMarginTops[nextId] : 0));
    ans += Math.max(dragData.mySpecs.marginTop, (prevId >= 0 ? this.itemMarginBottoms[prevId] : 0));
    ans += Math.max(dragData.mySpecs.marginBottom, (nextId < this.props.children.length ? this.itemMarginTops[nextId] : 0));
    return ans;
  }
  handleStartContinue(id, stl, downNo, elemDimensions) {
    if (downNo === this.downNo) {
      dragData.currList = this.props.myGid;
      dragData.target = this.me;
      dragData.dropCallback = this.dropCallback;
      dragData.dragName = this.props.dragName;
      dragData.item = this.props.children[id];
      dragData.itemDimensions = elemDimensions;
      dragData.mySpecs = {
        height: this.itemHeights[id],
        marginTop: this.itemMarginTops[id],
        marginBottom: this.itemMarginBottoms[id]
      };
      dragData.scrollListCallback = this.maybeScrollList;
      dragData.upState = this.setState;
      this.handleStartEvents();
      if (this.props.dragName === this.props.dropName) {
        this.blank = (typeof this.props.dropFunc === 'undefined' ? dragData.item : this.props.dropFunc(dragData.item));
        this.blocker = id + (this.props.clone === true ? 0 : 1);
        this.blankHeight = this.calculateBlankHeight(id - 1, this.blocker);
        this.draggedId = (this.props.clone === true ? -1 : id);
        this.blankH = this.calculateBlankH(this.blocker);
        if (this.props.clone === false) {
          this.transitionDuration = 0;
          setTimeout(this.maxOutTransitionDuration, 4);
        } else {
          this.maxOutTransitionDuration();
        }
      }
      this.setState({
        flying: this.props.children[id],
        currX: stl.left,
        currY: stl.top
      });
      this.startScrollInterval();
    }
  }
  handleOverInitial(e) {
    e.stopPropagation();
  }
  handleStart(id, stl, tOm, e, elem, elemDimensions) {
    if (this.props.dragName !== '') {
      this.initalElem = elem;
      const downNo = ++this.downNo;
      dragData.isTouchOrMouse = tOm;
      elem.addEventListener('overMeh', this.handleOverInitial);
      window.addEventListener('overMeh', this.removeFlyingDoubleHax);
      if (window.PointerEvent) {
        window.addEventListener('pointermove', this.moveFlyingBodyDoubleHax);
        window.addEventListener('pointerup', this.removeFlyingTripleHax);
      } else {
        window.addEventListener('mousemove', this.moveFlyingBodyDoubleHax);
        window.addEventListener('touchmove', this.moveFlyingBodyDoubleHax);
        window.addEventListener('mouseup', this.removeFlyingTripleHax);
        window.addEventListener('touchend', this.removeFlyingTripleHax);
      }
      this.moveFlyingBodyDoubleHax(e);
      if (tOm) {
        setTimeout(this.handleStartContinue, this.props.delayOnTouch, id, stl, downNo, elemDimensions);
      } else {
        setTimeout(this.handleStartContinue, this.props.delayOnMouse, id, stl, downNo, elemDimensions);
      }
    }
  }
  dropCallback() {
    if (this.draggedId !== -1) {
      this.props.removeItem(this.props.myGid, this.draggedId);
    }
    this.draggedId = -1;
  }
  drop() {
    if (this.blank !== null) {
      const item = this.blank;
      const id = this.blocker - (this.draggedId !== -1 && this.draggedId < this.blocker ? 1 : 0);
      this.blank = null;
      this.blocker = -1;
      this.blankH = -1;
      this.transitionDuration = 0;
      dragData.dropCallback();
      if (typeof this.props.insertItem !== 'undefined') {
        this.props.insertItem(item, this.props.myGid, id);
      }
    }
  }
  addEvents(di) {
    if (di !== null) {
      this.me = di;
      const stl = window.getComputedStyle(di, null);
      this.leftMargin = parseInt(stl.marginLeft, 10);
      this.topMargin = parseInt(stl.marginTop, 10);
      this.rightMargin = parseInt(stl.marginLeft, 10);
      this.bottomMargin = parseInt(stl.marginTop, 10);
      di.addEventListener('leaveMeh', this.handleLeaveList);
      di.addEventListener('enterMeh', this.handleEnterList);
      di.addEventListener('supermove', this.moveFlyingList);
      di.addEventListener('superend', this.drop);
    }
  }
  render() {
    const tag = (typeof this.props.tag === 'undefined' ? 'div' : this.props.tag);
    return React.createElement(tag, this.getListProps(),
      typeof this.props.upperElem !== 'undefined' && this.props.upperElem,
      typeof this.props.upperElem !== 'undefined' && <hr />,
      typeof this.props.children !== 'undefined' && this.props.children.map((item, i) => (typeof item !== 'undefined') &&
        (<DragItem
          setHeight={this.setHeight}
          trans={{ H: (i >= this.blocker && this.blank !== null ? this.blankHeight : 0), dur: this.transitionDuration }}
          key={i}
          setRelatives={(stl) => { dragData.relativeX = stl.left; dragData.relativeY = stl.top; }}
          onSthDown={this.handleStart}
          onSthEnter={this.handleEnterItem}
          onsupertouchmove={this.moveFlyingScrollList}
          myId={i}
          myGid={this.props.myId}
          destroyer={this.draggedId === i}
        >
          {item}
        </DragItem>)
      ),
      this.blank !== null && <BlankItem
        trans={this.blankH}
      >{this.blank}</BlankItem>,
      this.state.flying !== null && <FlyingItem
        left={this.state.currX}
        top={this.state.currY}
        elemDimensions={dragData.itemDimensions}
        rotate={this.props.rotateFlying}
      >{this.state.flying}</FlyingItem>,
      typeof this.props.bottomElem !== 'undefined' && <hr />,
      typeof this.props.bottomElem !== 'undefined' && this.props.bottomElem
    );
  }
}

DragList.PropTypes = {
  myGid: PropTypes.number.isRequired,
  clone: PropTypes.number,
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
