import React from 'react';

import DragList from 'drag-drop-list-react';

let ix = 0;
function getKey() {
  return ix++;
}
const smallerItemStyle = {
  background: '#ffeedd',
  border: '1px solid black',
  width: 20,
  height: 10,
  margin: 4
};

const itemStyle1 = {
  background: '#ddeeff',
  border: '2px black solid',
  width: '80%',
  height: 60,
  borderRadius: 20,
  margin: '15%',
  overflow: 'auto'
};

const itemStyle2 = {
  background: '#ffeedd',
  border: '16px black solid',
  width: 80,
  height: 40,
  borderRadius: 8,
  margin: '20%',
  overflow: 'auto'
}

const listStyle = {
  background: '#eee0ff',
  border: '3px black solid',
  width: 124,
  height: 600,
  padding: 36,
  display: 'inline-block',
  verticalAlign: 'top',
  overflow: 'auto'
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        [],
        [],
        [],
        [],
        [],
        [<div style={smallerItemStyle} key={getKey()}>asd</div>, <div style={smallerItemStyle} key={getKey()}>bbb</div>],
        [<div style={smallerItemStyle} key={getKey()}>ccc</div>, <div style={smallerItemStyle} key={getKey()}>ddd</div>]
      ]
    };
    this.initializeBindings();
  }
  componentDidMount() {
    const randomItems = ['asd', 'lol', 'bom', 'asdasd', 'ooo'];
    for (let i = 0; i < 20; ++i) {
      setTimeout(this.insertIntoItems, i, <div style={Math.random() < 0.5 ? itemStyle1 : itemStyle2} key={getKey()}>{randomItems[Math.round(Math.random() * 4)]}</div>, 0, i);
    }
  }
  initializeBindings() {
    this.insertIntoItems = this.insertIntoItems.bind(this);
    this.removeFromItems = this.removeFromItems.bind(this);
    this.addDoubleDragLists = this.addDoubleDragLists.bind(this);
  }
  addDoubleDragLists() {
    let _items = [];
    for (let i = 0; i < this.state.items[3].length; ++i) {
      _items[i] = React.cloneElement(this.state.items[3][i], {}, this.state.items[this.state.items[3][i].props.myGid]);
    }
    const _allitems = [...this.state.items];
    _allitems[3] = _items;
    _items = [];
    for (let i = 0; i < this.state.items[4].length; ++i) {
      _items[i] = React.cloneElement(this.state.items[4][i], {}, this.state.items[this.state.items[4][i].props.myGid]);
    }
    _allitems[4] = _items;
    this.setState({ items: _allitems });
  }
  insertIntoItems(item, gid, id) {
    const _items = [...this.state.items[gid]];
    if (id !== -1) {
      for (let i = _items.length - 1; i >= id; --i) {
        _items[i + 1] = _items[i];
      }
    }
    _items[(id === -1 ? _items.length : id)] = React.cloneElement(item, { ref: () => {}, key: getKey() });
    const _allItems = [...this.state.items];
    _allItems[gid] = _items;
    this.setState({
      items: _allItems
    });
    if (gid >= 5) {
      setTimeout(this.addDoubleDragLists, 2);
    }
  }
  removeFromItems(gid, id) {
    const _items = [...this.state.items[gid]];
    for (let i = id; i < _items.length - 1; ++i) {
      _items[i] = _items[i + 1];
    }
    _items.pop();
    const _allItems = [...this.state.items];
    _allItems[gid] = _items;
    this.setState({
      items: _allItems
    });
  }
  clearItems(gid) {
    const _items = [...this.state.items];
    _items[gid] = [];
    this.setState({
      items: _items
    });
  }

  render() {
    return (
      <div>
        <DragList myGid={0} dropName="asd" dragName="asd" removeItem={this.removeFromItems} insertItem={this.insertIntoItems} style={listStyle}>
          {this.state.items[0]}
        </DragList>
        <DragList clone={true} myGid={1} dropName="asd" dragName="bcd" removeItem={this.removeFromItems} insertItem={this.insertIntoItems} style={listStyle}>
          {this.state.items[1]}
        </DragList>
        <DragList myGid={2} dropName="bcd" dragName="asd" removeItem={this.removeFromItems} insertItem={this.insertIntoItems} style={listStyle}>
          {this.state.items[2]}
        </DragList>
        <DragList myGid={3} dragName="draglistception1" dropName="draglistception2" insertItem={this.insertIntoItems} style={listStyle}>
          {this.state.items[3]}
        </DragList>
        <DragList myGid={4} dragName="draglistception2" dropName="draglistception1" insertItem={this.insertIntoItems} style={listStyle}>
          {this.state.items[4]}
        </DragList>
      </div>
    );
  }
}