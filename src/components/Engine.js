import React, { Component } from 'react';
import _ from 'lodash';

import '../css/Engine.css';
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
  var other = ['Dief','Adyt','Valeera','Neiv','Voix','Eim','Ryot','Saut','Njörðr','Vðit','Vanir'];
  var humanoid = ['Tifk','Jaeger','Felix','Isildor','Grimshank','McKellan',"O'Donnel",'Dalf','Shaemus'];

  var choices = [humanoid, other];

  var first_layer = Math.floor(Math.random()*choices.length);
  var second_layer = Math.floor(Math.random()*choices[first_layer].length);

  return choices[first_layer][second_layer];
}

export default class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focus : [],
      turn : "black",
      bHealth : 500,
      wHealth : 500,
      bCardsInHand : [],
      bCardsInPlay : [],
      wCardsInHand : [],
      wCardsInPlay : []
    }

    this.d20 = this.d20.bind(this);

    this.clearFocus = this.clearFocus.bind(this);
    this.addFocus = this.addFocus.bind(this);

    this.newCard = this.newCard.bind(this);
    this.generateHand = this.generateHand.bind(this);
    this.moveToPlay = this.moveToPlay.bind(this);

    this.attackPlayer = this.attackPlayer.bind(this);
    this.attackCard = this.attackCard.bind(this);
  }

  componentDidMount(){
    this.setState({
      bCardsInHand : this.generateHand("black"),
      wCardsInHand : this.generateHand("white")
    });
  }

  d20(){
    return Math.round(Math.random() * (20 - 0) + 0);
  }

  clearFocus(){
    this.setState({
      focus : []
    });
  }

  addFocus(current){
    let focus_array = this.state.focus;

    if(focus_array[0] === undefined){
      focus_array[0] = current;
    } else {
      focus_array[1] = current;
    }

    this.setState({
      focus : focus_array
    });

    if(focus_array[0] !== undefined && focus_array[1] !== undefined){
      this.attackCard();
    }
  }

  attackCard(){
    let focus_array = this.state.focus;

    console.log(focus_array);
    if(this.state.turn === "black"){
      focus_array[0].props.health = focus_array[0].props.health - focus_array[1].props.attack;
    } else {
      focus_array[0].props.health = focus_array[1].props.health - focus_array[0].props.attack;
    }
  }

  attackPlayer(card, attack){
    if(card === "white"){
      let new_value = this.state.wHealth - attack;
      this.setState({
        wHealth : new_value
      });
    } else {
      let new_value = this.state.bHealth - attack;
      this.setState({
        bHealth : new_value
      });
    }

    return false;
  }

  newCard(colour){
    let id = generateRandomID();
    let ap = Math.round(Math.random() * (30 - 10) + 10);
    let hp = Math.round(Math.random() * (30 - 10) + 10);
    let opponent = "black";

    if(colour === "white"){
      opponent = "black";
    } else {
      opponent = "white";
    }

    let card = <Card 
          key = {id}
          unique = {id}
          name = {generateName()}
          moveToPlay={() => this.moveToPlay(colour, id)}
          attackPlayer={() => this.attackPlayer(opponent, ap)}
          health = {hp}
          attack = {ap}
          player = {colour} />;

    return card;
  }

  moveToPlay(card, current){
    if(card === "black"){
      let bPlayInterim = this.state.bCardsInPlay;
      let bHandInterim = this.state.bCardsInHand;

      bHandInterim.map((row, i) => {
        if(row.key === current){
          bPlayInterim.push(bHandInterim[i]);
          this.addFocus(bHandInterim[i]);
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
          this.addFocus(wHandInterim[i]);
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

    _.times(4, i => {
      hand.push(this.newCard(colour));
    });

    return hand;
  }

  render() {
    return (
      <div className="container center">
        <img onClick={() => this.clearFocus()} alt="Duel" className="logo" src={logo}/>

        <div className={ this.state.turn + "-hp-bar center" }>
          <div className="stat white">{this.state.wHealth}</div>
          <div className="stat black">{this.state.bHealth}</div>
          <br />
          <div className="turn">Turn: {this.state.turn}</div>
        </div>

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