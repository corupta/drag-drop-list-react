import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';
import Input from "./Input";

const topElems = [];

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
    this.insertItem(item, myGid, this.state.items[myGid].length);
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
      <div>
        <DragDrop myGid={0} topElem={topElems[0]} bottomElem={this.bottomElems[0]} dragName='abc' removeItem={this.removeItem}>
          {this.state.items[0]}
        </DragDrop>
        <DragDrop myGid={0} topElem={topElems[1]} bottomElem={this.bottomElems[1]} dragName='abc'>
          {this.state.items[0]}
        </DragDrop>
        <DragDrop myGid={0} topElem={topElems[2]} bottomElem={this.bottomElems[2]} dropName='abc' dropFunc={this.mutateItem}>
          {this.state.items[0]}
        </DragDrop>
        <DragDrop myGid={0} topElem={topElems[3]} bottomElem={this.bottomElems[3]} dropName='abc'>
          {this.state.items[0]}
        </DragDrop>
      </div>
    );
  }
}
