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

  moveToPlay(card){
    if(card === "black"){
      let bPlayInterim = this.state.bCardsInPlay;
      bPlayInterim.push(<Card key={generateRandomID()} player="black" />);

      let bHandInterim = this.state.bCardsInHand;
      bHandInterim.pop();

      this.setState({
        bCardsInPlay : bPlayInterim,
        bCardsInHand : bHandInterim
      });
    } else {
      let wPlayInterim = this.state.wCardsInPlay;
      wPlayInterim.push(<Card key={generateRandomID()} player="white" />);

      let wHandInterim = this.state.wCardsInHand;
      wHandInterim.pop();

      this.setState({
        wCardsInPlay : wPlayInterim,
        wCardsInHand : wHandInterim
      });
    }

    console.log("Moved");
  }

  generateHand(colour){
    var hand = [];

    if(colour === "black"){
      _.times(4, i =>
        hand.push(
          <Card key={generateRandomID()}
          moveToPlay={() => this.moveToPlay("black")}
          player="black" />)
      );
    } else {
      _.times(4, i =>
        hand.push(<Card key={generateRandomID()}
          moveToPlay={() => this.moveToPlay("white")}
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

        <div className="white-container mid">
          {this.state.wCardsInPlay}
        </div>

        <div className="black-container">
          {this.state.bCardsInHand}
        </div>

        <div className="black-container mid">
          {this.state.bCardsInPlay}
        </div>
      </div>
    );
  }
}
