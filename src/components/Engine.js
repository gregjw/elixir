import React, { Component } from 'react';
// import _ from 'lodash';

import '../css/Engine.css';
import Card from './Card.js';
import Dialog from './Dialog.js';
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
  var leaves = ['Pine Needle','Fir Leaf','Oak Leaf','Chesnut','Pinecone','Birch Leaf','Fern','Shrub','Earth root','Silverleaf','Peacebloom','Nightmare Thorn','Adders Bite','Whiptail','Grave moss','Tombrot','Briarthorn','Bruiseweed','Fadeleaf','Volatile Fireweed','Fools Cap','Starleaf','Sungrass','Liferoot','Plucked Poppy','Tiger Lily','Rotnettle','Twistedbloom','Corrupted nettle ','Life Essence','Fire Essence','Living Essence','Burning vine','Ogres thumb','Ghouls claw','Rabbit droppings','Starlight dust','Archmages hair','Crystalized vine','Ghost nettle ','Fire Scale','Scattered Dragonscale ','Cobalt silversage','Pheonix Ashes','Decaying Lichweed'];
  var misc = ['Quill','Feather','Dirt','Mud','Sand','Dust'];

  var choices = [leaves, misc];

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
      interval : null,
      timeRemaining : 120,
      score : 0,
      bHealth : 500,
      wHealth : 500,
      target : [],
      base : [],
      blackCards : [],
      blueCards : [],
      whiteCards : [],
      redCards : [],
      blackCardsPlay : [],
      blueCardsPlay : [],
      whiteCardsPlay : [],
      redCardsPlay : []
    }

    this.d20 = this.d20.bind(this);

    this.clearFocus = this.clearFocus.bind(this);
    this.addFocus = this.addFocus.bind(this);

    this.newCard = this.newCard.bind(this);
    this.tweakCard = this.tweakCard.bind(this);

    this.generateHand = this.generateHand.bind(this);
    this.moveToPlay = this.moveToPlay.bind(this);

    this.attackPlayer = this.attackPlayer.bind(this);
    this.attackCard = this.attackCard.bind(this);

    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount(){
    this.setState({
      blackCards : this.generateHand("black"),
      whiteCards : this.generateHand("white"),
      blueCards : this.generateHand("blue"),
      redCards : this.generateHand("red"),
      target : this.generateTarget("white"),
      base : this.generateBase("black")
    });

    this.startTimer();
  }

  startTimer(){
    let interval = setInterval(this.tick, 1000);
    this.setState({ interval: interval });
  }

  tick(){
    if (this.state.timeRemaining > 0){
      this.setState({ timeRemaining: this.state.timeRemaining - 1 });
    } else {
      clearInterval(this.state.interval);
    }
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
      console.log("FOCUS 1: " + current);
      focus_array[0] = current;
    } else if(focus_array[1] === undefined){
      console.log("FOCUS 2: " + current);
      focus_array[1] = current;
    } else {
      focus_array[0] = current;
      focus_array[1] = undefined;
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

    if(this.state.turn === "black"){
      this.tweakCard(focus_array[0].props, focus_array[1].props);
    } else {
      this.tweakCard(focus_array[1].props, focus_array[0].props);
    }
  }

  tweakCard(first, second){
    let new_attack = first.attack + second.attack;
    let new_health = first.health + second.health;

    let newBase = [];

    let card = <Card 
      key = {generateRandomID()}
      unique = {first.unique}
      name = {first.name}
      moveToPlay={first.moveToPlay}
      attackPlayer={first.attackPlayer}
      health = {new_health}
      attack = {new_attack}
      player = "black" />;

    if(this.state.base !== []){
      var base_card = this.state.base[0];
      new_attack += base_card.props.attack;
      new_health += base_card.props.health;

      card = <Card 
        key = {generateRandomID()}
        unique = {first.unique}
        name = {first.name}
        moveToPlay={first.moveToPlay}
        attackPlayer={first.attackPlayer}
        health = {new_health}
        attack = {new_attack}
        player = "black" />;
    }

    newBase.push(card);

    this.setState({
      focus : [],
      base : newBase
    });
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
      let PlayInterim = this.state.blackCardsPlay; 
      let HandInterim = this.state.blackCards; 

      HandInterim.map((row, i) => {
        if(row.key === current){
          PlayInterim.push(HandInterim[i]);
          this.addFocus(HandInterim[i]);
          HandInterim.splice(current, 1);
        }

        return current;
      });

      this.setState({
        blackCardsPlay : PlayInterim,
        blackCards : HandInterim
      });
    } else if(card === "red"){
      let bPlayInterim = this.state.redCardsPlay; 
      let bHandInterim = this.state.redCards; 

      bHandInterim.map((row, i) => {
        if(row.key === current){
          bPlayInterim.push(bHandInterim[i]);
          this.addFocus(bHandInterim[i]);
          bHandInterim.splice(current, 1);
        }

        return current;
      });

      this.setState({
        redCardsPlay : bPlayInterim,
        redCards : bHandInterim
      });
    } else if(card === "blue"){
      let bPlayInterim = this.state.blueCardsPlay; 
      let bHandInterim = this.state.blueCards; 

      bHandInterim.map((row, i) => {
        if(row.key === current){
          bPlayInterim.push(bHandInterim[i]);
          this.addFocus(bHandInterim[i]);
          bHandInterim.splice(current, 1);
        }

        return current;
      });

      this.setState({
        blueCardsPlay : bPlayInterim,
        blueCards : bHandInterim
      });
    } else {
      let wPlayInterim = this.state.whiteCardsPlay;
      let wHandInterim = this.state.whiteCards;

      wHandInterim.map((row, i) => {
        if(row.key === current){
          wPlayInterim.push(wHandInterim[i]);
          this.addFocus(wHandInterim[i]);
          wHandInterim.splice(current, 1);
        }

        return current;
      });

      this.setState({
        whiteCardsPlay : wPlayInterim,
        whiteCards : wHandInterim
      });
    }
  }

  generateTarget(colour){
    let id = generateRandomID();
    let ap = Math.round(Math.random() * (30 - 10) + 10);
    let hp = Math.round(Math.random() * (30 - 10) + 10);

    let card = <Dialog 
          key = {id}
          unique = {id}
          name = {generateName()}
          stat1 = {hp}
          stat2 = {ap}
          player = {colour} />;

    var hand = [];
    hand.push(card);
    return hand;
  } 

  generateBase(colour){
    let id = generateRandomID();
    let ap = 10;
    let hp = 10;

    let card = <Card 
          key = {id}
          unique = {id}
          name = "Potion"
          attack = {ap}
          health = {hp}
          player = {colour} />;

    var hand = [];
    hand.push(card);
    return hand;
  }

  generateHand(colour){
    var hand = [];
    hand.push(this.newCard(colour));

    // _.times(1, i => {
    //   hand.push(this.newCard(colour));
    // });

    return hand;
  }

  render() {
    return (
      <div className="container center">
        <img onClick={() => this.clearFocus()} alt="Elixir" className="logo" src={logo}/>
        <div className="subtitle">a quick-paced potion-brewing card game</div>
        <div className={"bar-" +  this.state.turn + " center" }>
          <div className="time">
            Time remaining
            <br /><br />
            {this.state.timeRemaining} seconds
          </div>
        </div>
        <div className="score center">{this.state.score}</div>

        <div className="hand-container">
          <div className="white-play">
            {this.state.target}
          </div>

          <div className="black-play">
            {this.state.base}
          </div>
        </div>

        <div className="hand-container center">
          <div className="white-hand">
            {this.state.whiteCards}
          </div>

          <div className="blue-hand">
            {this.state.blueCards}
          </div>

          <div className="red-hand">
            {this.state.redCards}
          </div>

          <div className="black-hand">
            {this.state.blackCards}
          </div>

        </div>
      </div>
    );
  }
}