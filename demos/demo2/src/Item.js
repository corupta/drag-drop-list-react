import React from 'react';
import PropTypes from 'prop-types';

export default class Item extends React.Component {
  render() {
    return (
      <div style={this.props.style !== 'undefined' ? this.props.style : {}}>
        {typeof this.props.title !== 'undefined' && this.props.title !== '' && <h3>{this.props.title}</h3>}
        {React.createElement('p', {}  ,
          typeof this.props.img !== 'undefined' && this.props.img !== '' &&
            <img alt='some item' src={this.props.img} style={typeof this.props.imgStyle !== 'undefined' ? this.props.imgStyle : {}} />,
          typeof this.props.desc !== 'undefined' && this.props.desc !== '' && <span>{this.props.desc}</span>)}
        {<b>$ {this.props.price}</b>}
      </div>
    );
  }
}

Item.propTypes = {
  style: PropTypes.shape(),
  img: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.number.isRequired,
  imgStyle: PropTypes.shape()
};
