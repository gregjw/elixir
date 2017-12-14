import React, { Component } from 'react';
import '../css/Arena.css';
import _ from 'lodash';

import Card from './Card.js';
import logo from '../assets/d20.png';

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

function generateName(){
  var choices =
  ['Defile','Wrath','Adapt','Valeera','Maex','Neiv','Vox','Eim','Rot'];

  var generated = choices[Math.floor(Math.random()*choices.length)];
  return generated;
}

export default class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryFocus : [],
      secondaryFocus : [],
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

      bHandInterim.map((row, i) => {
        if(row.key === current){
          bPlayInterim.push(bHandInterim[i]);
          bHandInterim.splice(current, 1);
        }

        return current;
      });

      this.setState({
        bCardsInPlay : bPlayInterim,
        bCardsInHand : bHandInterim
      });
    } else {
      let wPlayInterim = this.state.wCardsInPlay;
      let wHandInterim = this.state.wCardsInHand;

      wHandInterim.map((row, i) => {
        if(row.key === current){
          wPlayInterim.push(wHandInterim[i]);
          wHandInterim.splice(current, 1);
        }

        return current;
      });

      this.setState({
        wCardsInPlay : wPlayInterim,
        wCardsInHand : wHandInterim
      });
    }
  }

  generateHand(colour){
    var hand = [];

    if(colour === "black"){
      _.times(4, i => {
        let random = generateRandomID();
        hand.push(
          <Card 
          key = {random}
          unique = {random}
          name = {generateName()}
          moveToPlay={() => this.moveToPlay("black", random)}
          health = {Math.round(Math.random() * (30 - 10) + 10)}
          attack = {Math.round(Math.random() * (30 - 10) + 10)}
          player="black" />)
      });
    } else {
      _.times(4, i => {
        let random = generateRandomID();
        hand.push(
          <Card 
          key = {random}
          unique = {random}
          name = {generateName()}
          moveToPlay={() => this.moveToPlay("white", random)}
          health = {Math.round(Math.random() * (30 - 10) + 10)}
          attack = {Math.round(Math.random() * (30 - 10) + 10)}
          player="white" />)
      });
    }

    return hand;
  }

  render() {
    return (
      <div className="container center">
        <img alt="Duel" className="logo" src={logo}/>

        <div className="white-hand">
          {this.state.wCardsInHand}
        </div>

        <div className="white-play">
          {this.state.wCardsInPlay}
        </div>


        <div className="black-hand">
          {this.state.bCardsInHand}
        </div>

        <div className="black-play">
          {this.state.bCardsInPlay}
        </div>
      </div>
    );
  }
}