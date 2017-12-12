import React, { Component } from 'react';
import '../css/Card.css';

function generateRandomID(){
  var dictionary =
  ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z',
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  '0','1','2','3','4','5','6','7','8','9'];

  var d1 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d2 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d3 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d4 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d5 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d6 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d7 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d8 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d9 = dictionary[Math.floor(Math.random()*dictionary.length)];
  var d10 = dictionary[Math.floor(Math.random()*dictionary.length)];

  var generated = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10;
  return generated;
}

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player : this.props.player,
      unique : generateRandomID(),
      attack : 15,
      health : 20
    };
  }

  render() {
    return (
      <div className={this.state.player + "-card"}>
        <div className="unique">{this.state.unique}</div>
        <div className="center">
          <div className="attack">{this.state.attack}</div>
          <div className="health">{this.state.health}</div>
        </div>
      </div>
    );
  }
}