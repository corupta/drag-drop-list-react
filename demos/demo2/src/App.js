import React from 'react';
import DragList, { getKey } from 'drag-drop-list-react';

import Item from './Item';

const imgStyle = {
  height: 100,
  width: 100,
  margin: 'auto',
  padding: 8
};

const bodyStyle = {
  width: '100%',
  height: '100%',
  background: '#f0fff5',
  position: 'absolute'
};

const mainStyle = {
  width: 800,
  margin: '40px auto',
  background: '#f0ffee',
  border: '3px solid black',
  boxShadow: '0 0 24px #888888',
  WebkitBoxShadow: '0 0 24px #888888'
};

const listStyle1 = {
  width: 250,
  background: '#ffe1f0',
  height: 600,
  overflow: 'auto',
  margin: 20,
  border: '2px solid black',
  display: 'inline-block'
};

const listStyle2 = {
  width: 150,
  background: '#efffdf',
  height: 600,
  overflow: 'auto',
  margin: 20,
  border: '3px groove red',
  display: 'inline-block'
};

const listStyle3 = {
  width: 120,
  background: '#dfefff',
  height: 600,
  margin: 20,
  border: '3px groove yellow',
  display: 'inline-block'
};

const itemStyle1 = {
  width: 200,
  margin: 'auto',
  marginBottom: 40,
  border: '1px solid black',
  background: '#ccddee',
  color: '#ffeedd'
};

const itemStyle2 = {
  width: 200,
  margin: 'auto',
  marginBottom: 40,
  border: '2px groove red',
  bakcground: '#eeddcc',
  color: '#ddeeff'
};

const myCart = (
  <div>
    <img alt='myCart' src='https://d30y9cdsu7xlg0.cloudfront.net/png/28468-200.png' style={imgStyle} />
    <h2>My Cart!</h2>
  </div>
);

const trash = (
  <div>
    <img alt='trash' src='http://downloadicons.net/sites/default/files/open--trash-can-icon-80062.png' style={imgStyle} />
    <h2>Trash</h2>
  </div>
);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [
        [],
        []
      ]
    };
    this.insertItem = this.insertItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.createSomeItems = this.createSomeItems.bind(this);
  }
  componentDidMount() {
    this.createSomeItems();
  }
  onDrop(myGid, item) {
    let newItem;
    switch (myGid) {
      case 0:
        newItem = React.cloneElement(item, { myGid: 0, style: { width: 200 } });
        break;
      default:
        newItem = React.cloneElement(item, { myGid: 1, style: { width: 100 } });
    }
    return newItem;
  }
  insertItem(item, myGid, myId) {
    const _items = [...this.state.items[myGid]];
    for (let i = _items.length; i >= myId; --i) {
      _items[i + 1] = _items[i];
    }
    _items[myId] = item;
    const _allItems = [...this.state.items];
    _allItems[myGid] = _items;
    this.setState({
      items: _allItems
    });
  }
  removeItem(myGid, myId) {
    const _items = [...this.state.items[myGid]];
    for (let i = myId; i < _items.length - 1; ++i) {
      _items[i] = _items[i + 1];
    }
    _items.pop();
    const _allItems = [...this.state.items];
    _allItems[myGid] = _items;
    this.setState({
      items: _allItems
    });
  }
  createSomeItems() {
    const titles = ['', 'T-Shirt', 'Pants', 'Jacket', 'Gloves', 'Shoes'];
    const descs = ['', 'Something to wear.', 'Something that can keep you hot.', 'Super thick.', 'Very cheap.', 'Great looking.'];
    const prices = [1.6, 10.3, 50.4, 100.7, 500.1, 999.9, 300.8];
    const urls = [
      '',
      'https://image.spreadshirtmedia.com/image-server/v1/products/1003716746/views/1,width=800,height=800,appearanceId=1,backgroundColor=fff,version=1485256808/i-eat-ass-t-shirt-men-s-t-shirt.jpg',
      'https://d39dp5zikyykwb.cloudfront.net/public/api/cloudfront/image/224872/400/1/80/FFF/0/20161209133713261_fv_pimcore_1913556_flat.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/e3/b1/18/e3b11838b3f8745c39e289c12b1356cb--motorcycle-jackets-for-men-mens-motorcycle-jacket.jpg',
      'https://cdn.shopify.com/s/files/1/0113/9052/products/9.jpeg',
      'https://i.ebayimg.com/00/s/MjM2WDMxNQ==/z/cG4AAOSwnQhXoNRO/$_57.JPG'
    ];
    const _items = [];
    const maxn = 20;
    for (let i = 0; i < maxn; ++i) {
      _items[i] = (
      <Item
        myGid={0}
        title={titles[Math.round(Math.random() * 5)]}
        desc={descs[Math.round(Math.random() * 5)]}
        price={prices[Math.round(Math.random() * 6)]}
        img={urls[Math.round(Math.random() * 5)]}
        style={Math.round < 0.5 ? itemStyle1 : itemStyle2}
        imgStyle={imgStyle}
        key={getKey()}
        />
      );
    }
    this.setState({
     items: [ _items, [] ]
    });
  }
  render() {
    let tot1 = 0.0;
    this.state.items[1].map((item) => {if (typeof item !== 'undefined') { tot1 += item.props.price; } });
    return (
      <div style={bodyStyle}>
        <div style={mainStyle}>
          <DragList myGid={0} clone={true} dragName='a' dropFunc={this.onDrop} insertItem={this.insertItem} removeItem={this.removeItem}
                    style={listStyle1} upperElem={<h2>Items For Sale!</h2>}>
            {this.state.items[0]}
          </DragList>
          <DragList myGid={1} dragName='a' dropName='a' dropFunc={this.onDrop} insertItem={this.insertItem} removeItem={this.removeItem}
                    style={listStyle2} bottomElem={<h2>{tot1}</h2>} upperElem={myCart}>
            {this.state.items[1]}
          </DragList>
          <DragList myGid={-1} dropName='a' style={listStyle3} upperElem={trash}/>
        </div>
      </div>
    );
  }
}
