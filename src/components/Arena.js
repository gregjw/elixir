import React, { Component } from 'react';
import '../css/Arena.css';
import _ from 'lodash';

import Card from './Card.js';

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

export default class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTurn : "black",
      bHealth : 500,
      wHealth : 500,
      bCardsInHand : [],
      bCardsInPlay : [],
      wCardsInHand : [],
      wCardsInPlay : []
    }

    this.generateHand = this.generateHand.bind(this);
    this.moveToPlay = this.moveToPlay.bind(this);
  }

  componentDidMount(){
    this.setState({
      bCardsInHand : this.generateHand("black"),
      wCardsInHand : this.generateHand("white")
    });
  }

  moveToPlay(card, current){
    if(card === "black"){
      let bPlayInterim = this.state.bCardsInPlay;
      let bHandInterim = this.state.bCardsInHand;

      bPlayInterim.push(bHandInterim[current]);
      bHandInterim.pop(bHandInterim[current]);

      this.setState({
        bCardsInPlay : bPlayInterim,
        bCardsInHand : bHandInterim
      });
    } else {
      let wPlayInterim = this.state.wCardsInPlay;
      let wHandInterim = this.state.wCardsInHand;

      wPlayInterim.push(wHandInterim[current]);
      wHandInterim.pop(wHandInterim[current]);

      this.setState({
        wCardsInPlay : wPlayInterim,
        wCardsInHand : wHandInterim
      });
    }

    console.log("Moved " + current);
  }

  generateHand(colour){
    var hand = [];

    if(colour === "black"){
      _.times(4, i =>
        hand.push(
          <Card key={generateRandomID()}
          card = {i}
          unique = {generateRandomID()}
          moveToPlay={() => this.moveToPlay("black", i)}
          player="black" />)
      );
    } else {
      _.times(4, i =>
        hand.push(<Card key={generateRandomID()}
          card = {i}
          unique = {generateRandomID()}
          moveToPlay={() => this.moveToPlay("white", i)}
          player="white" />)
      );
    }

    return hand;
  }

  render() {
    return (
      <div className="container center">
        <div className="white-container">
          {this.state.wCardsInHand}
        </div>

        <div className="white-play">
          {this.state.wCardsInPlay}
        </div>

        <div className="black-container">
          {this.state.bCardsInHand}
        </div>

        <div className="black-play">
          {this.state.bCardsInPlay}
        </div>
      </div>
    );
  }
}
