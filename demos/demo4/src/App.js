import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';


import Header from './items/Header';
import ShortText from './items/ShortText'
import LongText from './items/LongText';
import Image from './items/Image';
import Break from './items/Break';
import SwitchButton from "./SwitchButton";
/*
import BuildHeader from './items/BuildHeader';
import BuildShortText from './items/BuildShortText';
import BuildLongText from './items/BuildLongText';
import BuildImage from './items/BuildImage';
import BuildBreak from './items/BuildBreak';
*/

const mainStyle = {

};

const bigMainStyle = {

};

const leftListStyle = {

};

const rightListStyle = {

};

const trashStyle={

};

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [
        {
          type: Header,
          content: 'corupta',
          key: getKey()
        },
        {
          type: LongText,
          contentUp: 'asd',
          contentDown: '',
          key: getKey()
        }
      ],
      list: [
        {
          type: Header,
          content: '',
          key: getKey()
        },
        {
          type: ShortText,
          content: '',
          key: getKey()
        },
        {
          type: LongText,
          contentUp: '',
          contentDown: '',
          key: getKey()
        },
        {
          type: Image,
          url: '',
          key: getKey()
        },
        {
          type: Break,
          key: getKey()
        }
      ],
      editMode: true
    };
    this.switchMode = this.switchMode.bind(this);
    this.upContent = this.upContent.bind(this);
    this.insertItem = this.insertItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  switchMode() {
    console.log('switch');
    this.setState({
      editMode: !this.state.editMode
    });
  }
  upContent(myId, contentUp, contentDown){
    const _items = [...this.state.items];
    const _item = { ..._items[myId] };
    switch(this.state.items[myId].type){
      case 'Header':
      case 'ShortText':
        _item.content = contentUp;
        break;
      case 'LongText':
        _item.contentUp = contentUp;
        _item.contentDown = contentDown;
        break;
      case 'Image':
        _item.url = contentUp;
        break;
      default:
    }
    _items[myId] = _item;
    this.setState({
      items: _items
    });
  }
  getItemName(name, builder) {
    /*
    if (builder) {
      switch (name) {
        case Header:
          return BuildHeader;
        case ShortText:
          return BuildShortText;
        case LongText:
          return BuildLongText;
        case Image:
          return BuildImage;
        case Break:
          return Break;
      }
    }
    */
    return name;
  }
  createMapItems(items, builder, editMode) {
    console.log(items);
    return items.map((item, i) => {
      return React.createElement(this.getItemName(item.type, builder), {
        ...item,
        editMode: editMode,
        upContent: this.upContent,
        myId: i
      });
    });
  }
  insertItem(item, myGid, myId) {
    const _items = [...this.state.items];
    for (let i = _items.length; i > myId; --i) {
      _items[i] = _items[i - 1];
    }
    _items[myId] = item;
    this.setState({
      items: _items
    });
  }
  removeItem(myGid, myId) {
    const _items = [...this.state.items];
    for (let i = myId; i < _items.length - 1; ++i) {
      _items[i] = _items[i + 1];
    }
    _items.pop();
    this.setState({
      items: _items
    });
  }
  render() {
    return (
      <div style={this.state.editMode ? bigMainStyle : mainStyle}>
        <SwitchButton editMode={this.state.editMode} switchMode={ this.switchMode }/>
        {false && this.state.editMode && <DragDrop myGid={-1} style={leftListStyle} dragName='abc'>{this.createMapItems(this.state.list, true, true)}</DragDrop>}
        {this.state.editMode ?
          (<DragDrop myGid={-2} style={rightListStyle} delayOnMouse={400} dragName='abc' dropName='abc' insertItem={this.insertItem} removeItem={this.removeItem}>
            {this.createMapItems(this.state.items, false, true)}
          </DragDrop>)
          : this.createMapItems(this.state.items, false, false)}
        {false && this.state.editMode && <DragDrop myGid={-3} style={trashStyle} dropName='abc' />}
      </div>
    );
  }
}
