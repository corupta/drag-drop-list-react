import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';
import Input from "./Input";

const mainStyle = {
  margin: '12px auto',
  width: 1200,
  border: '1px solid black',
  padding: 16,
  textAlign: 'center',
  background: '#c388c0',
  boxShadow: '0 0 24px #888888',
  WebkitBoxShadow: '0 0 24px #888888'
};

const baseTopElemStyle = {
  margin: 0
};

const topElemStyles = [
  {
    ...baseTopElemStyle,
    background: '#dbf0db'
  },
  {
    ...baseTopElemStyle,
    background: '#d1e0e0'
  },
  {
    ...baseTopElemStyle,
    background: '#ffcccc'
  },
  {
    ...baseTopElemStyle,
    background: '#ffe4cc'
  }
];

const baseBottomElemStyle = {

};

const bottomElemStyles = [
  {
    ...baseBottomElemStyle,
  },
  {
    ...baseBottomElemStyle,

  },
  {
    ...baseBottomElemStyle,

  },
  {
    ...baseBottomElemStyle,

  }
];

const baseListStyle = {
  display: 'inline-block',
  width: 250,
  height: 800,
  border: '2px solid black',
  margin: 16
};

const listStyle = [
  {
    ...baseListStyle,
    background: '#b8e0b8',

  },
  {
    ...baseListStyle,
    background: '#b3cccc',

  },
  {
    ...baseListStyle,
    background: '#FFAAAA',

  },
  {
    ...baseListStyle,
    background: '#FFD1AA',

  }
];

const topElems = [
  (<ul style={topElemStyles[0]}>
    <li> myGid = 0 </li>
    <li> no insert function </li>
    <li> removeItem = function </li>
    <li> dragName = 'abc' </li>
    <li> no dropName </li>
    <li> no dropFunc </li>
  </ul>),
  (<ul style={topElemStyles[1]}>
    <li> myGid = 1 </li>
    <li> no insert function </li>
    <li> no remove function </li>
    <li> dragName = 'abc' </li>
    <li> no dropName </li>
    <li> no dropFunc </li>
  </ul>),
  (<ul style={topElemStyles[2]}>
    <li> myGid = 2 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> no dragName </li>
    <li> dropName = 'abc' </li>
    <li> dropFunc = function (change bg of item) </li>
  </ul>),
  (<ul style={topElemStyles[3]}>
    <li> myGid = 3 </li>
    <li> no insert function </li>
    <li> no remove function </li>
    <li> no dragName </li>
    <li> dropName = 'abc' </li>
    <li> no dropFunc </li>
  </ul>)
];

const baseItemStyle = {
  border: '3px solid black',
  margin: '8px auto',
  width: 'calc(100% - 60px)',
  padding: 8,
  borderRadius: 12
};

const itemStyles = [
  {
    ...baseItemStyle,
    background: '#7cbd75'
  },
  {
    ...baseItemStyle,
    background: '#76bcb6'
  },
  {
    ...baseItemStyle,
    background: '#cf6368'
  },
  {
    ...baseItemStyle,
    background: '#d19261'
  }
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
        <Input style={bottomElemStyles[0]} myGid={0} pushItem={this.pushItem} removeList={this.removeList} />
      ),
      (
        <Input style={bottomElemStyles[1]}  myGid={1} pushItem={this.pushItem} removeList={this.removeList} />
      ),
      (
        <Input style={bottomElemStyles[2]}  myGid={2} pushItem={this.pushItem} removeList={this.removeList} />
      ),
      (
        <Input style={bottomElemStyles[3]}  myGid={3} pushItem={this.pushItem} removeList={this.removeList} />
      )
    ];
  }
  componentWillMount() {
    /*for (let i = 0; i < 4; ++i) {
      setTimeout(this.pushItem, i, 'asd', i);
    }*/
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
  removeItem(myGid, myId, callback) {
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
    this.insertItem(React.createElement('div', { style: itemStyles[myGid], key: getKey(), dangerouslySetInnerHTML: { __html: item } }), myGid, this.state.items[myGid].length);
  }
  removeList(myGid) {
    const _allItems = [...this.state.items];
    _allItems[myGid] = [];
    this.setState({
      items: _allItems
    });
  }
  mutateItem(item, myGid) {
    const myStyle = (typeof item.props === 'undefined' || typeof item.props.style === 'undefined' ? {} : { ...item.props.style });
    myStyle.background = `rgb(${ Math.round(Math.random() * 255) }, ${ Math.round(Math.random() * 255) }, ${ Math.round(Math.random() * 255) })`;
    console.log(myStyle);
    console.log(item);
    const newItem = React.cloneElement(item, { style: myStyle });
    console.log(newItem);
    return newItem;
  }
  render() {
    return (
      <div style={mainStyle}>
        <DragDrop myGid={0} style={listStyle[0]} itemClass='item' topElem={topElems[0]} bottomElem={this.bottomElems[0]} dragName='abc' removeItem={this.removeItem}>
          {this.state.items[0]}
        </DragDrop>
        <DragDrop myGid={1} style={listStyle[1]} itemClass='item' topElem={topElems[1]} bottomElem={this.bottomElems[1]} dragName='abc'>
          {this.state.items[1]}
        </DragDrop>
        <DragDrop myGid={2} style={listStyle[2]} itemClass='item' topElem={topElems[2]} bottomElem={this.bottomElems[2]} dropName='abc' dropFunc={this.mutateItem} insertItem={this.insertItem}>
          {this.state.items[2]}
        </DragDrop>
        <DragDrop myGid={3} style={listStyle[3]} itemClass='item' topElem={topElems[3]} bottomElem={this.bottomElems[3]} dropName='abc' insertItem={this.insertItem}>
          {this.state.items[3]}
        </DragDrop>
      </div>
    );
  }
}
