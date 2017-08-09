import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';


const mainStyle = {
  width: 1200,
  margin: '40px auto',
  background: '#ffffee',
  border: '3px solid black',
  boxShadow: '0 0 24px #888888',
  WebkitBoxShadow: '0 0 24px #888888',
  textAlign: 'center',
  verticalAlign: 'top',
  padding: 12
};

const listDetailsTop = [
  (<div>
      <h2> List 0 </h2>
      <ul>
        <li> Clonable <br />(no remove function) </li>
        <li> Not scrollable <br />(dragName !== dropName) </li>
        <li> Draggable, Not Droppable </li>
        <li> Items in this list can be dropped to lists 1, 2, 4, 5 </li>
      </ul>
    </div>),
  (<div>
      <h2> List 1 </h2>
      <ul className='shrink'>
        <li> Clonable <br />(no remove function) </li>
        <li> Scrollable <br />(dragName === dropName) </li>
        <li> Both Draggable and Droppable </li>
        <li> Items in this list can be dropped to lists 1, 2, 4, 5 </li>
        <li> Items in lists 0, 1, 3, 4 can be dropped to this list </li>
      </ul>
    </div>),
  (<div>
      <h2> List 2 </h2>
      <ul className='shrinkLittle'>
        <li> Clonable <br />(no remove function) </li>
        <li> Not scrollable <br />(dragName !== dropName) </li>
        <li> Not Draggable, but Droppable </li>
        <li> Items in lists 0, 1, 3, 4 can be dropped to this list </li>
      </ul>
    </div>),
  (<div>
      <h2> List 3 </h2>
      <ul className='shrinkLittle'>
        <li> Not clonable <br />(there is a remove function) </li>
        <li> Not scrollable <br />(dragName !== dropName) </li>
        <li> Not Draggable, but Droppable </li>
        <li> Items in this list can be dropped to lists 1, 2, 4, 5 </li>
      </ul>
    </div>),
  (<div>
      <h2> List 4 </h2>
      <ul className='shrink'>
        <li> Not clonable <br />(there is a remove function) </li>
        <li> Scrollable <br />(dragName === dropName) </li>
        <li> Not Draggable, but Droppable </li>
        <li> Items in this list can be dropped to lists 1, 2, 4, 5 </li>
        <li> Items in lists 0, 1, 3, 4 can be dropped to this list </li>
      </ul>
    </div>),
  (<div>
      <h2> List 5 </h2>
      <ul className='shrinkLittle'>
        <li> Not clonable <br />(there is a remove function) </li>
        <li> Not scrollable <br />(dragName !== dropName) </li>
        <li> Not Draggable, but Droppable </li>
        <li> Items in lists 0, 1, 3, 4 can be dropped to this list </li>
      </ul>
    </div>),
];

const listDetailsBottom = [
  (<ul className='shrinkLittle'>
    <li> myGid = 0 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> dragName = 'a' </li>
    <li> no dragName </li>
  </ul>),
  (<ul className='shrinkLittle'>
    <li> myGid = 1 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> dragName = 'a' </li>
    <li> dropName = 'a' </li>
  </ul>),
  (<ul className='shrinkLittle'>
    <li> myGid = 2 </li>
    <li> insertItem = function </li>
    <li> no remove function </li>
    <li> dropName = 'a' </li>
    <li> no dropName </li>
  </ul>),
  (<ul className='shrinkLittle'>
    <li> myGid = 3 </li>
    <li> insertItem = function </li>
    <li> removeItem = function </li>
    <li> dragName = 'a' </li>
    <li> no dragName </li>
  </ul>),
  (<ul className='shrinkLittle'>
    <li> myGid = 4 </li>
    <li> insertItem = function </li>
    <li> removeItem = function </li>
    <li> dragName = 'a' </li>
    <li> dropName = 'a' </li>
  </ul>),
  (<ul className='shrinkLittle'>
    <li> myGid = 5 </li>
    <li> insertItem = function </li>
    <li> removeItem = function </li>
    <li> dropName = 'a' </li>
    <li> no dropName </li>
  </ul>),

];

const allItems = [
  [
    'Interinvolving aerostation cercariae gypsyhead semitonally. Abo gemology arcading unquiet unretrenched. Fountain lammas undisconnected excurvation andamanese.',
    'Radiobroadcast ridgepole filterableness intercommunicative intransigeant. Unlunated noneducable demivierge liguria plasma. Sexivalent everest tammie malodorous icterical.',
    'Familiarize klansman outbetter rotorua phlegmier. Sneezewort viverrine supersubstantial ascot tasajillo. Pharsalia wallachia unbragging nonprognosticative crocidolite.'
  ],
  [
    'Hug zoï¿¥ï¾¡grafting antimilitary ryeland intercircle. Squintingness blazonry unnimbleness unimpeachable philol. Abaculus enabler mercurified willamette fumulus.',
    'Preinvest cheekpiece rafflesia palmyra juristic. Threap echelette carburetter serpiginous verbalise. Achromatically liard anton untrigonometric bricky.',
    'Geitonogamy paracelsistic bombable segregated petrography. Falsifying crunodal unfiltered redescribe confluent. Northwesterly shrinkable knucklebone acquirer stormtide.'
  ],
  [
    'Dotage phosphorylate fraise benefic stockingless. Melchisedech landwehr abbï¿¥ï¾½ coachbuilder unjam. Mekka slug bourgeon nondepletive cation.',
    'Hypercholia jack encephalography overgovern uninsinuating. Haemoglobinuria kremenchug meccano malathion diptych. Mugwump tike residence supersensitised doyle.',
    'Gob nonconditional unsubducted inception modeller. Repurpose stonefish coltsfoot gravely entreaty. Nonisoelastic communizing adorable nonputrescence temperament.'
  ],
  [
    'Enginous testudinate trichite goosefishes horsens. Instantaneously ganoin centreboard monolith stirps. Heathier unflaring overdecorating braconid barrault.',
    'Plasmapheresis virescent superflexion overstep wivern. Semiductile indigenous hail electrostrictive nontitular. Noncoercion nonpatriotically behindhand frolickly barging.',
    'Nonsignificancy bootless nonobservance nonunderstandable crotopus. Quinoid unfuturistic manless dyskinesia hersh. Prefavorite paniculate epibolic biogenic hermitry.'
  ],
  [
    'Bohunk regulated procolonial ophicleide theurgically. Heydey bombastical contravene mannerism chastisable. Milter mig apheliotropism affable stressfully.',
    'Muricate taupo devious wooziest erythrophyll. Eosinophile advocatory honor libellant housekept. Swill burgos backboard conferee frascati.',
    'Correctedness promonarchist pizz simulacre quintet. Grained shiftier dobla menoschesis sepaloid. Cubicity catullian twigless unimpressionable floral.'
  ],
  [
    'Erycina unodored harmonics lumberly conventionalization. Inserted levelness unmolesting orthiconoscope alipterion. Vacuolar alcapton pruderies wampuses linable.',
    'Xnty rachiform palatalized yahooism glassware. Compact intramuscularly remembrancer racine mythopoeic. Gamophyllous middleweight lafayette underfiend shotwell.',
    'Withdrew heathendom oxygenating boxer belmond. Spooney shanghai hogger nonconsequence soporiferousness. Infatuating hoggishly cataphasia tref limoges'
  ]
];

const itemBaseStyle = {
  width: 120,
  color: '#fff',
  padding: 8,
  fontSize: 12,
  //textAlign: 'left',
  //letterSpacing: '0.2em',
  textAlign: 'left',
  textShadow: '2px 2px #222222',
  margin: '6px auto',
  borderStyle: 'groove',
  borderWidth: 2,
  borderRadius: 10
}

const itemStyles = [
  {
    ...itemBaseStyle,
    background: '#aabbcc',
    borderColor: '#ddeeff'
  },
  {
    ...itemBaseStyle,
    background: '#ccaabb',
    borderColor: '#ffddee'
  },
  {
    ...itemBaseStyle,
    background: '#bbccaa',
    borderColor: '#eeffdd'
  },
  {
    ...itemBaseStyle,
    background: '#bbaacc',
    borderColor: '#ddeeff'
  },
  {
    ...itemBaseStyle,
    background: '#ccbbaa',
    borderColor: '#ffeedd'
  },
  {
    ...itemBaseStyle,
    background: '#aaccbb',
    borderColor: '#ddeeff'
  }
];

const listBaseStyle = {
  width: 172,
  margin: 12,
  display: 'inline-block',
  height: 860,
  overflow: 'auto'
}

const listStyles = [
  {
    ...listBaseStyle,
    background: '#ddddff',
    border: '2px solid black'
  },
  {
    ...listBaseStyle,
    background: '#ffdddd',
    border: '2px solid black'
  },
  {
    ...listBaseStyle,
    background: '#ddffdd',
    border: '2px solid black'
  },
  {
    ...listBaseStyle,
    background: '#d0d0ee',
    border: '2px groove RebeccaPurple'
  },
  {
    ...listBaseStyle,
    background: '#eed0d0',
    border: '2px groove RebeccaPurple'
  },
  {
    ...listBaseStyle,
    background: '#d0eed0',
    border: '2px groove RebeccaPurple'
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [ [], [], [], [], [], [] ]
    };
    this.insertItem = this.insertItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentDidMount() {
    const _items = [ [], [], [], [], [], [] ];
    allItems.map((itemSet, i) => itemSet.map((item, j) => _items[i][j] = <div style={itemStyles[i]} key={getKey()}>{item}</div> ));
    this.setState({
      items: _items
    });
  }
  insertItem(item, myGid, myId) {
    const _allitems = [...this.state.items];
    const _items = [..._allitems[myGid]];
    for (let i = _items.length; i > myId; --i) {
      _items[i] = _items[i - 1];
    }
    _items[myId] = item;
    _allitems[myGid] = _items;
    this.setState({
      items: _allitems
    });
  }
  removeItem(myGid, myId) {
    const _allitems = [...this.state.items];
    const _items = [..._allitems[myGid]];
    for (let i = myId; i < _items.length - 1; ++i) {
      _items[i] = _items[i + 1];
    }
    _items.pop();
    _allitems[myGid] = _items;
    this.setState({
      items: _allitems
    });
  }
  render() {
    return (
      <div className='allLists' style={mainStyle}>
        <DragDrop style={listStyles[0]} topElem={listDetailsTop[0]} bottomElem={listDetailsBottom[0]}
                  myGid={0} insertItem={this.insertItem} dragName='a'>
          {this.state.items[0]}
        </DragDrop>
        <DragDrop style={listStyles[1]} topElem={listDetailsTop[1]} bottomElem={listDetailsBottom[1]}
                  myGid={1} insertItem={this.insertItem} dragName='a' dropName='a'>
          {this.state.items[1]}
        </DragDrop>
        <DragDrop style={listStyles[2]} topElem={listDetailsTop[2]} bottomElem={listDetailsBottom[2]}
                  myGid={2} insertItem={this.insertItem} dropName='a'>
          {this.state.items[2]}
        </DragDrop>
        <DragDrop style={listStyles[3]} topElem={listDetailsTop[3]} bottomElem={listDetailsBottom[3]}
                  myGid={3} insertItem={this.insertItem} removeItem={this.removeItem} dragName='a'>
          {this.state.items[3]}
        </DragDrop>
        <DragDrop style={listStyles[4]} topElem={listDetailsTop[4]} bottomElem={listDetailsBottom[4]}
                  myGid={4} insertItem={this.insertItem} removeItem={this.removeItem} dragName='a' dropName='a'>
          {this.state.items[4]}
        </DragDrop>
        <DragDrop style={listStyles[5]} topElem={listDetailsTop[5]} bottomElem={listDetailsBottom[5]}
                  myGid={5} insertItem={this.insertItem} removeItem={this.removeItem} dropName='a'>
          {this.state.items[5]}
        </DragDrop>
      </div>
    );
  }
}