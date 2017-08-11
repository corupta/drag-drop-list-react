# DragDrop List for React

Check out the awesome, and very easy to use react component for creating a dragdrop list.

## Table of Contents

- [Demos](#demos)
- [Installing](#installing)
- [Getting Started](#getting-started)
- [Options (Props)](#options-props)
    - [`myGid` option:](#mygid-option)
    - [`dragName` option:](#dragname-option)
    - [`dropName` option:](#dropname-option)
    - [`removeItem` option:](#removeitem-option)
    - [`insertItem` option:](#insertitem-option)
    - [`dropFunc` option:](#dropfunc-option)
    - [`style` option:](#style-option)
    - [`animationDuration` option](#animationduration-option)
    - [`class` option:](#class-option)
    - [`itemClass` option:](#itemclass-option)
    - [`topElem` option:](#topelem-option)
    - [`bottomElem` option:](#bottomelem-option)
    - [`topElemSticks` option:](#topelemsticks-option)
    - [`bottomElemSticks` option:](#bottomelemsticks-option)
    - [`scrollWhen` option:](#scrollwhen-option)
    - [`scrollSpeed` option:](#scrollspeed-option)
    - [`delayOnTouch` option:](#delayontouch-option)
    - [`delayOnMouse` option:](#delayonmouse-option)
    - [`rotateFlying` option:](#rotateflying-option)
    - [`lockX` option:](#lockx-option)
- [Children](#children)
- [Understanding How It Works](#understanding-how-it-works) 

## Demos

Check out those demos, to see what that package looks like:
      
      /*<li> <a href='demo2' target='_blank'> Demo 2 - Shopping List </a> </li>
      <li> <a href='demo3' target='_blank'> Demo 3 - Drag & Drop Props </a> </li>
      <li> <a href='demo4' target='_blank'> Demo 4 - Profile Page </a> </li>
      <li> <a href='demo5' target='_blank'> Demo 5 - Drag & Drop Props 2 </a> </li>
      <li> <a href='demo6' target='_blank'> Demo 6 - Drag & Drop & Input </a> </li>
      <li> <a href='demo7' target='_blank'> Demo 7 - Drag & Drop Other Options </a> </li>
      */
      
[All Demos](//github.io/corupta/docs "All Demos")
[I'm an inline-style link with title](https://www.google.com "Google's Homepage")
* Demo 1
* Demo 2
* Demo 3


## Installing

Use `npm i -g react-drag-drop-list` to install globally, or `npm i react-drag-drop-list` to install it locally to your project.

Or use `npm i -D react-drag-drop-list` to install it to your project as a dev-dependency. (Which, you probably won't want to?)

Although npm installs for you, make sure you have installed its dependencies: `react`, `prop-types` and `react-dom`.


## Getting Started

Use `import DragList from 'DragList'` to use it in a React project.

What's more, you can use `import DragList, { getKey() } from 'DragList'` to also use the `getKey()` function, whose behavior is explained below.


## Options (Props)

|      PropName       |                Default Value                  |                    Type                    |Is Required|
|:-------------------:|:---------------------------------------------:|:------------------------------------------:|:---------:|
|      **myGid**      |                 `Undefined`                   |                   Number                   |*Required* |
|    **dragName**     |                 `Undefined`                   |                   String                   |*Optional* |
|    **dropName**     |                 `Undefined`                   |                   String                   |*Optional* |
|   **removeItem**    |                 `Undefined`                   |           function(myGid, myId)            |*Optional* |
|   **insertItem**    |                 `Undefined`                   |function(dropFunc(item, myGid), myGid, myId)|*Optional* |
|    **dropFunc**     |`function(item, myGid)`<br />`{ return item; }`|           function(item, myGid)            |*Optional* |
|      **style**      |                 `Undefined`                   |      React Style Object (camelCased)       |*Optional* |
|**animationDuration**|                    `250`                      |                   Number                   |*Optional* |
|      **class**      |                 `Undefined`                   |                   String                   |*Optional* |
|      **itemClass**      |                 `Undefined`                   |                   String                   |*Optional* |
|     **topElem**     |                 `Undefined`                   |             HTML / JSX Object              |*Optional* |
|    **bottomElem**   |                 `Undefined`                   |             HTML / JSX Object              |*Optional* |
|  **topElemSticks**  |                    `True`                     |                    Bool                    |*Optional* |
|**bottomElemSticks** |                    `True`                     |                    Bool                    |*Optional* |
|   **scrollWhen**    |                     `48`                      |                   Number                   |*Optional* |
|   **scrollSpeed**   |                    `1.00`                     |              Number / Float                |*Optional* |
|   **delayOnTouch**  |                    `400`                      |                   Number                   |*Optional* |
|  **delayOnMouse**   |                     `0`                       |                   Number                   |*Optional* |
|  **rotateFlying**   |                    `True`                     |                    Bool                    |*Optional* |
|      **lockX**      |                   `False`                     |                    Bool                    |*Optional* |


<!---
```
props = {
  myGid: (undefined) - required - number
  dragName: (undefined) - string
  dropName: (undefined) - string
  removeItem: (undefined) - function(myGid, myId)
  insertItem: (undefined) - function(dropFunc(item, myGid), myGid, myId)
  dropFunc: (function(item, myGid){ return item; } ), - function(item, myGid)
  style: (undefined) - react style object (camelCased)
  animationDuration: (250) - number
  class: (undefined) - string
  topElem: (undefined) - html / jsx object
  bottomElem: (undefined) - html / jsx object
  topElemSticks: (true) - bool
  bottomElemSticks: (true) - bool
  scrollWhen: (48) - number
  scrollSpeed: (1.00) - number/float
  delayOnTouch: (400) - number
  delayOnMouse: (0) - number
  rotateFlying: (true) - bool
}
```
--->



### `myGid` option:

Give a unique id(number) to a list. This field is required. 

Note that, `dropFunc`, `insertItem` and `removeItem` functions are called as `dropFunc(item, myGid)`, `insertItem(item, myGid, myId)` and `removeItem(myGid, myId)`.
So instead of a random number, you would most likely start from 0 to the number of listItems.

An example implementation could be like that:

```js
constructor(props) {
  this.state = {
    items: [
      [],
      [],
      []  
    ]
  };
  this.insertItem = this.insertItem.bind(this);
  this.removeItem = this.removeItem.bind(this);
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
render() {
  return (
    <div>
      <DragList myGid={0} insertItem={this.insertItem} removeItem={this.removeItem} dragName='a' dropName='a'>
        {this.state.items[0]}
      </DragList>
      <DragList myGid={1} insertItem={this.insertItem} removeItem={this.removeItem} dragName='a' dropName='a'>
        {this.state.items[1]}
      </DragList>
      <DragList myGid={2} insertItem={this.insertItem} removeItem={this.removeItem} dragName='a' dropName='a'>
        {this.state.items[2]}
      </DragList>
    </div>
  );
}
```

Important Note: Two dragLists used in the same project should not have the same myGid, even though if they are not children of the same element.
This issue is fixable, so contact me if that bothers you.   



### `dragName` option:

An optional string value that determines to which lists the items dragged from the current list can be dropped.
If empty, or not entered, the current list is not draggable.

An item dragged from a list whose `dragName` is 'x' can only be dropped to lists whose `dropName` is also 'x'.

For example, if a list's `dragName` and `dropName` are different, items dragged from the list cannot be dropped on the same list. 

(More like `scrollable: false` in other libraries when used like this. But its use is a lot more extended this way.)


### `dropName` option:

An optional string value that determines from which lists dragged items can be dropped into current list.
If empty, or not entered, the current list is not droppable.

An item dragged from a list whose `dragName` is 'x' can only be dropped to lists whose `dropName` is also 'x'.

Currently, one list can have only one `dragName` and only one `dropName`. I can add multiple `dragName/dropName` support later. If you are interested in this, contact me.


### `removeItem` option:

An optional function that is called like `removeItem(myGid, myId);` when an item is removed from the list

Don't pass this value if you want to make a list clonable. (Meaning, the items will duplicate when dragged.)

(Not passing this function is similar to making `clone: true` in similar libraries.)


### `insertItem` option:

An optional function that is called like `insertItem(item, myGid, myId);` when an item is inserted to a list.

Important Note: if there's an dropFunc function passed to the list that an item is inserted,
the function is actually called as `insertItem(dropFunc(item, myGid), myGid, myId);`


### `dropFunc` option:

An optional function that is called when a dragged item is dragged to a droppable list 
(whose `dropName` equals the `dragName` of the list from which the item was dragged) and creates a blank item (ghost item) in the list (result of the `dropFunc(item, myGid)`)

If there's no `dropFunc` option passed, it acts as if the following dropFunc is implemented.
```js
dropFunc(item, myGid) {
  return item;
}
```


### `style` option:

An optional prop where you can pass style objects for the list. (camelCase - react style).


### `animationDuration` option:

An optional number specifying the milliseconds it should take each item to animate to their new position when their position changes.

Default value is 250.


### `class` option:

Similar to most `className` props, this option is used to pass class name string to the list. Optional.


### `itemClass` option:

Similar to most `className` props, this option is used to pass class name string to the items in the list. Optional.

When, you are using this option, be careful that the items you passed via the children prop take className props. 
Meaning, either they are JSX objects that take a className prop, or HTML objects (which by default take a className prop)

Failure to do so would result in such items not having the passed itemClass prop as the class property. (Other items can still be fine)


### `topElem` option:

Optional prop to pass a jsx or html element that will stick to the top of the list if `topElemSticks` is true, or just be put in the top of the list if `topElemSticks` is false.
A <hr /> element will be added afterwards that element in the list.
This element will not be draggable!


### `bottomElem` option:

Optional prop to pass a jsx or html element that will stick to the bottom of the list if `bottomElemSticks` is true, or just be put in the bottom of the list if `bottomElemSticks` is false.
A <hr /> element will be added before that element in the list.
This element will not be draggable!


### `topElemSticks` option:

An optional prop specifying whether the `topElem` should stick to the top of the list or just be at the top of the list.
Default value is true.


### `bottomElemSticks` option:

An optional prop specifying whether the `bottomElem` should stick to the bottom of the list or just be at the bottom of the list.
Default value is true.


### `scrollWhen` option:

An optional number, specifying the number of pixels distance, that pointer has to be when an item is being dragged, in order to scroll.
(left of page, top of page, bottom of page, right of page, left of a list, top of a list, bottom of a list, right of a list) 
Default value is 48.


### `scrollSpeed` option:

An optional float number, specifying the speed of scroll.

Sample Values: 0.5 for X0.5 speed, 1.5 for X1.5 speed, 2.0 for X2 speed, 3.25123 for X3.25123 speed, 4.0 for X4 speed, etc.

Default value is 1.0


### `delayOnTouch` option:

An optional number specifying number of milliseconds, the user must keep touching the same item before the drag is started. 

(Stopping touch, moving touch out of item, etc. during this delay will prevent the item from being dragged.)

It is a good idea to use this when there is no margin in a list, but a user has to be able to scroll the list without dragging an item.

Another, good use for this option is when one or more of your items in this list have at least one input.

Default value is 400.


### `delayOnMouse` option:

An optional number specifying number of milliseconds, the user must keep pressing the mouse-left-click on the same item before the drag is started.

(Stopping to press, moving mouse out of item, etc. during this delay will prevent the item from being dragged.)

It is a good idea to use this when  one or more of your items in this list have at least one input.

Default value is 0.


### `rotateFlying` option:

An optional bool, specifying whether or not items dragged from this list should be rotated 6 degrees clockwise when being dragged. (Affects only the flying element)

Default is true.

Contact me if you think you need a rotation other than 6 degree, I can change this value to a number in a future release, so that it would specify the number of degrees.


### `lockX` option:

When an item from a DragDrop list whose `lockX` prop is set to true is dragged, it's x value, never changes. Meaning it's x value is locked.

Default is false.


## Children

Perhaps, the most important field.

```js
<DragDrop myGid={0} dragName='a'>
{this.state.items[0]}
</DragDrop>
```

That's a very very simple use case. Items in the DragDrop List should be given as a children that consists of an array of jsx objects / html elements.


## Understanding How It Works

Check out the codes of the demos, to see some examples and get a basic understanding of how this library works.

I'm trying to make it as extensive as possible, so feel free to contact me if you are looking for some new features.

Here are some notes, that may help your reasoning about this library:

- `clone: true` means there is no remove function.
- `clone: false` means there is a remove function.


- `scrollable: true` means dragName and dropName are the same, and different from empty string.
- `scrollable: false` means dragName and dropName are not the same or they are both empty strings.


- It is meaningless to pass an insertItem function if the dragName is empty.
- Giving an empty dragName means items in the list are not draggable.
- (The list can still be droppable)


- It is meaningless to pass a removeItem function or dropFunc function if the dropName is empty.
- Giving an empty dropName means the list is not droppable.
- (The items in the list can still be draggable)


- Important Note: If you are going to use overflow style for the list, don't put it in the class, but the list itself via the style prop.

- Implementing a trash list:

    - Make a list with no dragName but with a dropName.
    - Don't pass an insert function.
    - You will probably want to implement a dropFunc function.
    - That's because, although the list is a trashlist (whatever gets dropped is destroyed) there is a blank (ghost) item seen on the list when you drag an item over but do not drop. 
    - (This blank item is determined by the dropFunc function)


- Implementing dragDropListception:
    
    - A DragDropList can have another DragDropList as its item. 
    - However, beware that requires extra implementation for you.
    - That's because, when an item is dropped to a DragDropList inside another, you need to update both the item and the parent DragDropList.
    - What's more your dropFunc function must make a new gid (myGid prop), everytime the child DragDropList is copied.


- Creating a grid of items:
    
    - Sorry, that's not possible right now.
    - Your items can have different height / width / margin / paddings.
    - But, the current version only supports creating horizontal lists.
    - I may implement a vertical version later, contact me if you are interested in this.
    - Yet, implementing a version that can have items with different widths/heights/margins as a grid is very hard.
    - (That will probably require me to write another virtual DOM alongisde react's)
    - What's more, I'm not sure how this should act like.
    - (For example, are items going to fill up spaces between others, and etc.)
    - Contact me, if you have any ideas, or want such feature.
    - Note: Implementing a version for creating a grid of items with same width / height / margin is very easy actually.
    - So, contact me if you are interested in such feature.