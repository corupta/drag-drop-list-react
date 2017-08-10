import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';
import Input from "./Input";

const mainStyle = {
  margin: '12px auto',
  width: 1200,
  border: '1px solid black',
  padding: 16
};

const baseListStyle = {
  display: 'inline-block',
  width: 250,
  height: 800,
  border: '2px solid black',
  margin: 16
};

const listStyle = [
  {
    ...baseListStyle

  },
  {
    ...baseListStyle

  },
  {
    ...baseListStyle

  },
  {
    ...baseListStyle

  }
];

const topElems = [
  (<ul>
    <li> myGid = 0 </li>
    <li> no insert function </li>
    <li> removeItem = function </li>
    <li> dragName = 'abc' </li>
    <li> no dropName </li>
    <li> no dropFunc </li>
  </ul>),
  (<ul>
    <li> myGid = 1 </li>
    <li> no insert function </li>
    <li> no remove function </li>
    <li> dragName = 'abc' </li>
    <li> no dropName </li>
    <li> no dropFunc </li>
  </ul>),
  (<ul>
    <li> myGid = 2 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> no dragName </li>
    <li> dropName = 'abc' </li>
    <li> dropFunc = function (change bg of item) </li>
  </ul>),
  (<ul>
    <li> myGid = 3 </li>
    <li> no insert function </li>
    <li> no remove function </li>
    <li> no dragName </li>
    <li> dropName = 'abc' </li>
    <li> no dropFunc </li>
  </ul>)
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [ [], [], [], [] ]
    };
    this.insertItem = this.insertItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.pushItem = this.pushItem.bind(this);
    this.removeList = this.removeList.bind(this);
    this.mutateItem = this.mutateItem.bind(this);
    this.bottomElems = [
      (
        <Input myGid={0} pushItem={this.pushItem} removeList={this.removeList} />
      ),
      (
        <Input myGid={1} pushItem={this.pushItem} removeList={this.removeList} />
      ),
      (
        <Input myGid={2} pushItem={this.pushItem} removeList={this.removeList} />
      ),
      (
        <Input myGid={3} pushItem={this.pushItem} removeList={this.removeList} />
      )
    ];
  }
  insertItem(item, myGid, myId) {
    const _allItems = [...this.state.items];
    const _items = [..._allItems[myGid]];
    for (let i = _allItems.length; i > myId; --i) {
      _items[i] = _items[i - 1];
    }
    _items[myId] = item;
    _allItems[myGid] = _items;
    this.setState({
      items: _allItems
    });
  }
  removeItem(myGid, myId) {
    const _allItems = [...this.state.items];
    const _items = [..._allItems[myGid]];
    for (let i = myId; i < _items.length - 1; ++i) {
      _items[i] = _items[i + 1];
    }
    _items.pop();
    _allItems[myGid] = _items;
    this.setState({
      items: _allItems
    });
  }
  pushItem(item, myGid) {
    this.insertItem(React.createElement('div', { key: getKey(), dangerouslySetInnerHTML: { __html: item } }), myGid, this.state.items[myGid].length);
  }
  removeList(item, myGid) {
    const _allItems = [...this.state.items];
    _allItems[myGid] = {};
    this.setState({
      items: _allItems
    });
  }
  mutateItem(myGid, item) {

  }
  render() {
    return (
      <div style={mainStyle}>
        <DragDrop myGid={0} style={listStyle[0]} topElem={topElems[0]} bottomElem={this.bottomElems[0]} dragName='abc' removeItem={this.removeItem}>
          {this.state.items[0]}
        </DragDrop>
        <DragDrop myGid={1} style={listStyle[1]} topElem={topElems[1]} bottomElem={this.bottomElems[1]} dragName='abc'>
          {this.state.items[1]}
        </DragDrop>
        <DragDrop myGid={2} style={listStyle[2]} topElem={topElems[2]} bottomElem={this.bottomElems[2]} dropName='abc' dropFunc={this.mutateItem}>
          {this.state.items[2]}
        </DragDrop>
        <DragDrop myGid={3} style={listStyle[3]} topElem={topElems[3]} bottomElem={this.bottomElems[3]} dropName='abc'>
          {this.state.items[3]}
        </DragDrop>
      </div>
    );
  }
}
