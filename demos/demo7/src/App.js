import React from 'react';
import DragDrop, { getKey } from 'drag-drop-list-react';

const optionsInfos = [
  'Rotate / Don\'t Rotate Flying Item (Default is True)',
  'Scroll Speed (Default is 1.00)',
  'Scroll When (Default is 48, meaning 48px)',
  'Delay Before Dragging (Default is 0 for mouse, and 400 for touch. Meaning, 0ms and 400ms)',
  'Animation Duration (Items moving between themselves. Default is 250, meaning 250ms)'
];

const mainKeys = [
  getKey(),
  getKey(),
  getKey(),
  getKey(),
  getKey()
];

const listProps = [
  [
    { rotateFlying: true, key: getKey() },
    { rotateFlying: false, key: getKey() }
  ],
  [
    { scrollSpeed: 0.50, key: getKey() },
    { scrollSpeed: 1.00, key: getKey() },
    { scrollSpeed: 2.00, key: getKey() }
  ],
  [
    { scrollWhen: 2, key: getKey() },
    { scrollWhen: 24, key: getKey() },
    { scrollWhen: 48, key: getKey() },
    { scrollWhen: 96, key: getKey() }
  ],
  [
    { delayOnMouse: 0, delayOnTouch: 0, key: getKey() },
    { delayOnMouse: 200, delayOnTouch: 200, key: getKey() },
    { delayOnMouse: 400, delayOnTouch: 400, key: getKey() },
    { delayOnMouse: 800, delayOnTouch: 800, key: getKey() },
    { delayOnMouse: 1600, delayOnTouch: 1600, key: getKey() }
  ],
  [
    { animationDuration: 0, key: getKey() },
    { animationDuration: 100, key: getKey() },
    { animationDuration: 250, key: getKey() },
    { animationDuration: 500, key: getKey() },
    { animationDuration: 1000, key: getKey() }
  ]
];
const listDetails = [
  [
    (
      <ul>
        <li>rotateFlying: true</li>
      </ul>
    ),
    (
      <ul>
        <li>rotateFlying: false</li>
      </ul>
    )
  ],
  [
    (
      <ul>
        <li>scrollSpeed: 0.50</li>
      </ul>
    ),
    (
      <ul>
        <li>scrollSpeed: 1.00</li>
      </ul>
    ),
    (
      <ul>
        <li>scrollSpeed: 2.00</li>
      </ul>
    )
  ],
  [
    (
      <ul>
        <li>scrollWhen: 2</li>
      </ul>
    ),
    (
      <ul>
        <li>scrollWhen: 24</li>
      </ul>
    ),
    (
      <ul>
        <li>scrollWhen: 48</li>
      </ul>
    ),
    (
      <ul>
        <li>scrollWhen: 96</li>
      </ul>
    )
  ],
  [
    (
      <ul>
        <li>delayOnMouse: 0</li>
        <li>delayOnTouch: 0</li>
      </ul>
    ),
    (
      <ul>
        <li>delayOnMouse: 200</li>
        <li>delayOnTouch: 200</li>
      </ul>
    ),
    (
      <ul>
        <li>delayOnMouse: 400</li>
        <li>delayOnTouch: 400</li>
      </ul>
    ),
    (
      <ul>
        <li>delayOnMouse: 800</li>
        <li>delayOnTouch: 800</li>
      </ul>
    ),
    (
      <ul>
        <li>delayOnMouse: 1600</li>
        <li>delayOnTouch: 1600</li>
      </ul>
    )
  ],
  [
    (
      <ul>
        <li>animationDuration: 0</li>
      </ul>
    ),
    (
      <ul>
        <li>animationDuration: 100</li>
      </ul>
    ),
    (
      <ul>
        <li>animationDuration: 250</li>
      </ul>
    ),
    (
      <ul>
        <li>animationDuration: 500</li>
      </ul>
    ),
    (
      <ul>
        <li>animationDuration: 1000</li>
      </ul>
    )
  ]
];

const allItems = [
  [
    [
      'oversad',
      'nekton',
      'kerala'
    ],
    [
      'stedfast',
      'canaling',
      'diplococcal'
    ]
  ],
  [
    [
      'therm',
      'nightfall',
      'dora',
      'inunction',
      'undeleted',
      'concinnous',
      'horopteric',
      'habitation',
      'pierre',
      'maximizer',
      'unlaughing',
      'subrogation',
      'thieve',
      'alta',
      'ascertain',
      'dragonnade'
    ],
    [
      'unstress',
      'zurich',
      'gourd',
      'orion',
      'hundred',
      'pyramidia',
      'conjuration',
      'subaxillary',
      'copping',
      'insanitary',
      'salzgitter',
      'attingency',
      'tanga',
      'noisy',
      'flanker',
      'unmoveable'
    ],
    [
      'remington',
      'deceiving',
      'flax',
      'filefishes',
      'remainder',
      'angarsk',
      'blood',
      'bhakti',
      'reshower',
      'capitulated',
      'bilineate',
      'manacle',
      'forget',
      'mongrelness',
      'uncharmable',
      'venus'
    ]
  ],
  [
    [
      'unfiling',
      'apomyius',
      'barrenwort',
      'venizelos',
      'guardless',
      'beautifying',
      'mefitis',
      'typhon',
      'storehouses',
      'unwishful',
      'fathoms',
      'spoonless',
      'sextant',
      'disable',
      'obfuscation',
      'hort'
    ],
    [
      'traprock',
      'charlatanic',
      'droughty',
      'oilstone',
      'lullabying',
      'mastery',
      'summerly',
      'gateway',
      'vandyke',
      'cooeeing',
      'introduce',
      'riflebird',
      'succour',
      'sacring',
      'flamefish',
      'debarkation'
    ],
    [
      'cravatting',
      'demesne',
      'notogea',
      'darogha',
      'luxate',
      'galileo',
      'denunciator',
      'antiritual',
      'dissension',
      'grunt',
      'bighead',
      'genual',
      'anniston',
      'dervishhood',
      'jeremiah',
      'crl'
    ],
    [
      'caesura',
      'rank',
      'sparingly',
      'metatherian',
      'wiretap',
      'ladyship',
      'spouseless',
      'alb',
      'drammen',
      'blondish',
      'kidder',
      'absentee',
      'gillette',
      'filament',
      'redbreast',
      'pedicurist'
    ]
  ],
  [
    [
      'unoiling',
      'fritter',
      'designee'
    ],
    [
      'kickdown',
      'bastardised',
      'quincy'
    ],
    [
      'folios',
      'planetology',
      'unfrank'
    ],
    [
      'competition',
      'chagrin',
      'trepanation'
    ],
    [
      'subforeman',
      'humulone',
      'ecuadorian'
    ]
  ],
  [
    [
      'javelin',
      'overdevelop',
      'cupboard'
    ],
    [
      'thrave',
      'tortuga',
      'duchy'
    ],
    [
      'stegomyia',
      'amicable',
      'schizogony'
    ],
    [
      'bing',
      'amidation',
      'demantoid'
    ],
    [
      'exurbia',
      'unwomanish',
      'schnabel'
    ]
  ]
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [ ]
    };
    this.insertItem = this.insertItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentWillMount() {
    const _items = [];
    let t = 0;
    for (let i = 0; i < allItems.length; ++i) {
      for (let j = 0; j < allItems[i].length; ++j, ++t) {
        _items[t] = [];
        for (let k = 0; k < allItems[i][j].length; ++k) {
          _items[t][k] = <h3 key={ getKey() }>{allItems[i][j][k]}</h3>;
        }
      }
    }
    this.setState({
      items: _items
    });
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
    let t = 0;
    return (
      <div className='main'>
        {listDetails.map((lists, i) => {
          return (
            <div className={`group group${i}`} key={ mainKeys[i] }>
              <h2>{optionsInfos[i]}</h2>
              {lists.map((item, j) => {;
                const p = t ++;
                return React.createElement(
                  DragDrop,
                  {
                    style: { overflow: 'auto' },
                    myGid: p,
                    ...listProps[i][j],
                    topElem: item,
                    insertItem: this.insertItem,
                    removeItem: this.removeItem,
                    class: 'list list' + p,
                    itemClass: 'item item' + p,
                    dragName: `dd_${i}`,
                    dropName: `dd_${i}`
                  },
                  this.state.items[p]
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

