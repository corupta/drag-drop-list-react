import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';//'./src/index';

const mainStyle = {
  padding: 10,
  background: '#d3f0a8',
  width: 1300,
  textAlign: 'center',
  margin: '40px auto',
  border: '1px solid black',
  boxShadow: '0 0 24px #888888',
  WebkitBoxShadow: '0 0 24px #888888'
};

const overflowFix = {
  overflow: 'auto'
};

const listDetails = [
  (<ul>
    <li> myGid = 0 </li>
    <li> insertItem = function </li>
    <li> removeItem = function </li>
    <li> dragName = 'a' </li>
    <li> dropName = 'c' </li>
  </ul>),
  (<ul>
    <li> myGid = 1 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> dragName = 'b' </li>
    <li> dropName = 'a' </li>
  </ul>),
  (<ul>
    <li> myGid = 2 </li>
    <li> insertItem = function </li>
    <li> removeItem = function </li>
    <li> dragName = 'c' </li>
    <li> dropName = 'b' </li>
  </ul>),
  (<ul>
    <li> myGid = 3 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> dragName = 'b' </li>
    <li> dropName = 'c' </li>
  </ul>),
  (<ul>
    <li> myGid = 4 </li>
    <li> no insert function </li>
    <li> no remove function </li>
    <li> no dragName </li>
    <li> dropName = 'c' </li>
  </ul>),
  (<ul>
    <li> myGid = 5 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> dragName = 'c' </li>
    <li> dropName = 'c' </li>
  </ul>),
  (<ul>
    <li> myGid = 6 </li>
    <li> insertItem = function </li>
    <li> removeItem = function </li>
    <li> dragName = 'c' </li>
    <li> dropName = 'c' </li>
  </ul>),
];

const allItems = [
  [
    'The oriental sink rocks opposite the flavor.',
    'How can the firm symbol contain a north revolutionary?',
  ],
  [
    'The nut pokes your miracle past the iron elephant.',
    'Why won\'t the danger cup a homosexual concrete?'
  ],
  [
    'The workable conscience sickens above an exhibit.',
    'Her unconnected nerve resides.'
  ],
  [
    'The orient transformation gains the free drawback.',
    'The novel precedent sleeps beneath any endeavor.'
  ],
  [
    'The disposed gut distances the up well.',
    'A diary adjusts an academic without the printed bird.'
  ],
  [
    'Will the remembered pattern farm beside a brush?',
    'A fruit fiddles below the grass.'
  ],
  [
    'An arc jams the remote mathematics near the molecule.',
    'The post bell scratches the weekday.'
  ]
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [ [], [], [], [], [], [], [] ]
    };
    this.insertItem = this.insertItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentWillMount() {
    const _items = [...this.state.items];
    allItems.map((itemSet, i) => itemSet.map((item, j) => _items[i][j] = <h3 key={getKey()}>{item}</h3> ))
  }
  insertItem(item, myGid, myId) {
    const _allItems = [...this.state.items];
    const _items = [..._allItems[myGid]];
    for (let i = _allItems[myGid].length; i > myId; --i) {
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
  render() {
    return (
      <div style={mainStyle}>
        <DragDrop bottomElem={listDetails[0]} style={overflowFix} myGid={0} class='list list0' itemClass='item' insertItem={this.insertItem} removeItem={this.removeItem} dragName='a' dropName='c'>
          {this.state.items[0]}
        </DragDrop>
        <DragDrop bottomElem={listDetails[1]} style={overflowFix} myGid={1} class='list list1' itemClass='item' insertItem={this.insertItem} dragName='b' dropName='a'>
          {this.state.items[1]}
        </DragDrop>
        <DragDrop bottomElem={listDetails[2]} style={overflowFix} myGid={2} class='list list2' itemClass='item' insertItem={this.insertItem} removeItem={this.removeItem} dragName='c' dropName='b'>
          {this.state.items[2]}
        </DragDrop>
        <DragDrop bottomElem={listDetails[3]} style={overflowFix} myGid={3} class='list list3' itemClass='item' insertItem={this.insertItem} dragName='b' dropName='c'>
          {this.state.items[3]}
        </DragDrop>
        <DragDrop bottomElem={listDetails[4]} style={overflowFix} myGid={4} class='list list4' itemClass='item' removeItem={this.removeItem} dropName='c'>
          {this.state.items[4]}
        </DragDrop>
        <DragDrop bottomElem={listDetails[5]} style={overflowFix} myGid={5} class='list list5' itemClass='item' insertItem={this.insertItem} dragName='c' dropName='c'>
          {this.state.items[5]}
        </DragDrop>
        <DragDrop bottomElem={listDetails[6]} style={overflowFix} myGid={6} class='list list6' itemClass='item' insertItem={this.insertItem} removeItem={this.removeItem} dragName='c' dropName='c'>
          {this.state.items[6]}
        </DragDrop>
      </div>
    );
  }
}
