import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';


import Header from './items/Header';
import ShortText from './items/ShortText'
import LongText from './items/LongText';
import Image from './items/Image';
import Break from './items/Break';
import SwitchButton from "./SwitchButton";
import BuildHeader from './items/BuildHeader';
import BuildShortText from './items/BuildShortText';
import BuildLongText from './items/BuildLongText';
import BuildImage from './items/BuildImage';
import BuildBreak from './items/BuildBreak';

const mainStyle = {
  width: 500,
  background: '#e6b333',
  border: '2px #7E5B00 solid',
  margin: 'auto',
  textAlign: 'center',
  padding: 20,
  boxShadow: '0 0 24px #888888',
  WebkitBoxShadow: '0 0 24px #888888'
};

const bigMainStyle = {
  width: 900,
  background: '#e6b333',
  border: '2px #7E5B00 solid',
  margin: 'auto',
  textAlign: 'center',
  padding: 20
};

const leftListStyle = {
  margin: 12,
  display: 'inline-block',
  width: 200,
  background: '#3D6295',
  border: '2px #dcefe7 solid',
  borderTop: '1px #dcefe7 solid',
  overflow: 'auto',
  height: 800,
  verticalAlign: 'top',
  color: 'grey'
};

const rightListStyle = {
  margin: 12,
  display: 'inline-block',
  width: 400,
  background: '#55c394',
  border: '2px #005631 solid',
  overflow: 'auto',
  height: 800,
  verticalAlign: 'top'
};

const trashStyle = {
  margin: 12,
  color: '#661d00',
  display: 'inline-block',
  width: 200,
  background: '#FFA683',
  height: 800,
  verticalAlign: 'top',
  overflow: 'hidden',
  border: '2px solid #661d00'
};

const trashElement = (
  <div style={{ textAlign: 'center' }}>
    <img alt='trash' src='http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/red-white-pearls-icons-business/085927-red-white-pearl-icon-business-trashcan3.png'
         style={{ height: 128, width: 128 }} />
    <h2>Trash</h2>
  </div>
);

const itemStyle = {
  width: '100%',
  margin: '0px auto',
  padding: '8px 0',
  border: '3px #0E7147 groove',
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  background: '#bbf7de'
};

const buildItemStyle = {
  width: '100%',
  margin: '0px auto',
  padding: '8px 0',
  borderTop: '1px #dcefe7 solid',
  color: '#dcefe7',
  background: '#153A6D'
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
          contentDown: 'asdsd',
          key: getKey()
        },
        {
          type: Image,
          url: 'http://www.qygjxz.com/data/out/193/3856596-random-image.png',
          key: getKey()
        },
        {
          type: Break,
          key: getKey()
        },
        {
          type: ShortText,
          content: 'perpe',
          key: getKey()
        }
      ],
      list: [
        {
          type: BuildHeader,
          content: '',
          key: getKey()
        },
        {
          type: BuildShortText,
          content: '',
          key: getKey()
        },
        {
          type: BuildLongText,
          contentUp: '',
          contentDown: '',
          key: getKey()
        },
        {
          type: BuildImage,
          url: '',
          key: getKey()
        },
        {
          type: BuildBreak,
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
    //console.log('switch');
    this.setState({
      editMode: !this.state.editMode
    });
  }
  upContent(myId, contentUp, contentDown){
    const _items = [...this.state.items];
    const _item = { ..._items[myId] };
    switch(this.state.items[myId].type){
      case Header:
      case ShortText:
        _item.content = contentUp;
        break;
      case LongText:
        _item.contentUp = contentUp;
        _item.contentDown = contentDown;
        break;
      case Image:
        _item.url = contentUp;
        break;
      default:
    }
    _items[myId] = _item;
    this.setState({
      items: _items
    });
  }
  itemTypeToString(name) {
    switch (name) {
      case Header:
        return 'Header';
      case ShortText:
        return 'ShortText';
      case LongText:
        return 'LongText';
      case Image:
        return 'Image';
      case Break:
        return 'Break';
      case BuildHeader:
        return 'BuildHeader';
      case BuildShortText:
        return 'BuildShortText';
      case BuildLongText:
        return 'BuildLongText';
      case BuildImage:
        return 'BuildImage';
      case BuildBreak:
        return 'BuildBreak';
      default:
    }
  }
  stringToitemType(name) {
    switch (name) {
      case 'Header':
        return Header;
      case 'ShortText':
        return ShortText;
      case 'LongText':
        return LongText;
      case 'Image':
        return Image;
      case 'Break':
        return Break;
      default:
    }
  }
  getItemName(name) {
    const str = this.itemTypeToString(name);
    const newName = this.stringToitemType(str.substring(0, 5) === 'Build' ? str.substring(5) : str);
    return newName;
  }
  createMapItems(items, builder, editMode) {
    //console.log(items);
    return items.map((item, i) => {
      return <div style={ builder ? buildItemStyle : itemStyle } key={item.key}>{React.createElement(item.type, {
        ...item,
        editMode: editMode,
        upContent: this.upContent,
        myId: i
      })}</div>;
    });
  }
  insertItem(item, myGid, myId) {
    const _items = [...this.state.items];
    for (let i = _items.length; i > myId; --i) {
      _items[i] = _items[i - 1];
    }
    //console.log(item);
    //console.log(item.props.children);
    const myType =this.getItemName(item.props.children.props.type);
    _items[myId] = {
      type: myType,
      key: getKey()
    };
    switch (myType) {
      case Header:
      case ShortText:
        _items[myId].content = item.props.children.props.content;
        break;
      case Image:
        _items[myId].url = item.props.children.props.url;
        break;
      case LongText:
        _items[myId].contentUp = item.props.children.props.contentUp;
        _items[myId].contentDown = item.props.children.props.contentDown;
      break;
      default:
    }
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
        <div style={{ textAlign: 'left', color: '#fff8e6', textShadow: '1px 2px #444444', letterSpacing: 1 }}>
          <span>
            &nbsp;&nbsp; JotForm Made in China &nbsp;
            <i>(Yekta'ya özel)</i>
          </span>
        </div>
        <SwitchButton editMode={this.state.editMode} switchMode={ this.switchMode }/>
        <br />
        {this.state.editMode && <DragDrop myGid={-1} style={leftListStyle} dragName='abc'>{this.createMapItems(this.state.list, true, true)}</DragDrop>}
        {this.state.editMode ?
          (<DragDrop myGid={-2} style={rightListStyle} delayOnMouse={250} dragName='abc' dropName='abc' insertItem={this.insertItem} removeItem={this.removeItem} rotateFlying={false}>
            {this.createMapItems(this.state.items, false, true)}
          </DragDrop>)
          : <div style={rightListStyle}>{this.createMapItems(this.state.items, false, false)}</div>}
        {this.state.editMode && <DragDrop myGid={-3} style={trashStyle} dropName='abc' topElem={trashElement} />}
      </div>
    );
  }
}
