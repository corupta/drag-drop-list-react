import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';

import Item from './Item';

const imgStyle = {
  height: 72,
  width: 58,
  padding: 12,
};

const itemImgStyle = {
  ...imgStyle,
  padding: 0,
  float: 'left',
  margin: '0 6px 8px 4px'
};


const mainStyle = {
  width: 800,
  margin: '40px auto',
  background: '#eeffff',
  border: '3px solid black',
  boxShadow: '0 0 24px #888888',
  WebkitBoxShadow: '0 0 24px #888888',
  textAlign: 'center'
};

const listStyle1 = {
  width: 250,
  background: '#ffe1f0',
  height: 800,
  overflow: 'auto',
  margin: 20,
  border: '2px solid black',
  display: 'inline-block',
  verticalAlign: 'top'
};

const listStyle2 = {
  width: 200,
  background: '#efffdf',
  height: 800,
  overflow: 'auto',
  margin: 20,
  border: '3px groove red',
  display: 'inline-block',
  verticalAlign: 'top'
};

const listStyle3 = {
  width: 150,
  background: '#dfefff',
  height: 800,
  margin: 20,
  border: '3px groove yellow',
  display: 'inline-block',
  verticalAlign: 'top'
};

const itemStyle1 = {
  width: 200,
  margin: '16px auto',
  border: '1px solid black',
  background: '#ccddee',
  color: '#886644'
};

const itemStyle2 = {
  width: 200,
  margin: '10px auto',
  marginBottom: 10,
  border: '2px groove red',
  background: '#eeddcc',
  color: '#446688'
};

const myCart = (
  <div style={{ textAlign: 'center' }}>
    <img alt='myCart' src='https://d30y9cdsu7xlg0.cloudfront.net/png/28468-200.png' style={imgStyle} />
    <h2>My Cart!</h2>
  </div>
);

const trash = (
  <div style={{ textAlign: 'center' }}>
    <img alt='trash' src='http://downloadicons.net/sites/default/files/open--trash-can-icon-80062.png' style={imgStyle} />
    <h2>Trash</h2>
  </div>
);

const itemSet1 = [
  {
    title: 'T-Shirt',
    desc: 'Very Cheap.',
    url: 'https://image.spreadshirtmedia.com/image-server/v1/products/1003716746/views/1,width=800,height=800,appearanceId=1,backgroundColor=fff,version=1485256808/i-eat-ass-t-shirt-men-s-t-shirt.jpg',
    price: 12.3
  },
  {
    title: 'Pants',
    desc: 'Something to wear.',
    url: 'https://d39dp5zikyykwb.cloudfront.net/public/api/cloudfront/image/224872/400/1/80/FFF/0/20161209133713261_fv_pimcore_1913556_flat.jpg',
    price: 40.95
  },
  {
    title: 'Jacket',
    desc: 'Super thick.',
    url: 'https://s-media-cache-ak0.pinimg.com/736x/e3/b1/18/e3b11838b3f8745c39e289c12b1356cb--motorcycle-jackets-for-men-mens-motorcycle-jacket.jpg',
    price: 259.99
  },
  {
    title: 'Gloves',
    desc: 'Something that can keep you hot.',
    url: 'https://cdn.shopify.com/s/files/1/0113/9052/products/9.jpeg',
    price: 20.75
  },
  {
    title: 'Shoes',
    desc: 'Great looking.',
    url: 'https://i.ebayimg.com/00/s/MjM2WDMxNQ==/z/cG4AAOSwnQhXoNRO/$_57.JPG',
    price: 126.44
  }
];

const itemSet2 = [
  {
    title: 'Sunglasses',
    desc: 'Protects you from the sun.',
    url: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Happy-Hour-G2-Black-%26-Gold-Sunglasses-_261892-front.jpg',
    price: 105.48
  },
  {
    title: 'Watch',
    desc: 'Cool, and shows you time.',
    url: 'http://www.thinkgeek.com/images/products/zoom/imnl_tesla_watch.jpg',
    price: 68.9
  },
  {
    title: 'Necklace',
    desc: 'Very shiny.',
    url: 'https://cdn.notonthehighstreet.com/fs/64/92/b87a-d57b-42ba-817f-87e4cdce1c30/original_personalised-initial-birthstone-necklace.jpg',
    price: 31.5
  },
  {
    title: 'Skull Ring',
    desc: 'For those who love to hardcore rock.',
    url: 'https://www.thegreatfroglondon.com/wp-content/uploads/top-jaw-skull-ring-angled-600x600.jpg',
    price: 45
  }
];


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [
        [],
        [],
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
  onDrop(item, myGid) {
    if (myGid === 1 || myGid === 3) {
      return React.cloneElement(item, { style: { ...item.props.style, width: 150 }});
    }
    return React.cloneElement(item, { style: { ...item.props.style, width: 120 }});
  }
  insertItem(item, myGid, myId) {
    const _items = [...this.state.items[myGid]];
    for (let i = _items.length; i > myId; --i) {
      _items[i] = _items[i - 1];
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
    const _items = [[],[],[],[]];
    itemSet1.map((item, i) => _items[0][i] = (
      <Item
        imgStyle={itemImgStyle}
        title={item.title}
        desc={item.desc}
        img={item.url}
        price={item.price}
        style={Math.random() > 0.5 ? itemStyle1 : itemStyle2}
        key={getKey()}
      />
    ));
    itemSet2.map((item, i) => _items[2][i] = (
      <Item
        imgStyle={itemImgStyle}
        title={item.title}
        desc={item.desc}
        img={item.url}
        price={item.price}
        style={Math.random() > 0.5 ? itemStyle1 : itemStyle2}
        key={getKey()}
      />
    ));
    this.setState({
     items: _items
    });
  }
  render() {
    let tot1 = 0.0;
    this.state.items[1].map((item) => tot1 += item.props.price);
    const tot1elem = <h2>$ {tot1.toFixed(2)}</h2>
    let tot2 = 0.0;
    this.state.items[3].map((item) => tot2 += item.props.price);
    const tot2elem = <h2>$ {tot2.toFixed(2)}</h2>
    return (
      <div style={mainStyle}>
        <div>
          <DragDrop myGid={0} dragName='a' dropFunc={this.onDrop} insertItem={this.insertItem}
                    style={listStyle1} topElem={<h2>Items For Sale!</h2>}>
            {this.state.items[0]}
          </DragDrop>
          <DragDrop myGid={1} dragName='a' dropName='a' dropFunc={this.onDrop} insertItem={this.insertItem} removeItem={this.removeItem}
                    style={listStyle2} bottomElem={tot1elem} topElem={myCart}>
            {this.state.items[1]}
          </DragDrop>
          <DragDrop myGid={-1} dropName='a' dropFunc={this.onDrop} style={listStyle3} topElem={trash}/>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <DragDrop myGid={2} clone={true} dragName='b' dropFunc={this.onDrop} insertItem={this.insertItem}
                    style={listStyle1} topElem={<h2>Items For Sale!</h2>}>
            {this.state.items[2]}
          </DragDrop>
          <DragDrop myGid={3} dragName='b' dropName='b' dropFunc={this.onDrop} insertItem={this.insertItem} removeItem={this.removeItem}
                    style={listStyle2} bottomElem={tot2elem} topElem={myCart} rotateFlying={false}>
            {this.state.items[3]}
          </DragDrop>
          <DragDrop myGid={-2} dropName='b' dropFunc={this.onDrop} style={listStyle3} topElem={trash}/>
        </div>
      </div>
    );
  }
}
