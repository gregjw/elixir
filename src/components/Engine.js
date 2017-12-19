import React, { Component } from 'react';
// import _ from 'lodash';

import '../css/Engine.css';
import Card from './Card.js';
import Dialog from './Dialog.js';
import logo from '../assets/d20.png';

function ua_track(category, action){
  var ua = require('universal-analytics');
  var visitor = ua('UA-81505538-1');
  visitor.event(category, action).send();
}

function generateRandomID(){
  let dictionary =
  ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z',
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  '0','1','2','3','4','5','6','7','8','9'];

  let d1 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d2 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d3 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d4 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d5 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d6 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d7 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d8 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d9 = dictionary[Math.floor(Math.random()*dictionary.length)];
  let d10 = dictionary[Math.floor(Math.random()*dictionary.length)];

  let generated = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10;
  return generated;
}

function generateName(){
  let choices_array = ['Pine Needle','Fir Leaf','Oak Leaf','Chesnut','Pinecone','Birch Leaf','Fern','Shrub','Earth root','Silverleaf','Peacebloom','Nightmare Thorn','Adders Bite','Whiptail','Grave moss','Tombrot','Briarthorn','Bruiseweed','Fadeleaf','Volatile Fireweed','Fools Cap','Starleaf','Sungrass','Liferoot','Plucked Poppy','Tiger Lily','Rotnettle','Twistedbloom','Corrupted nettle ','Life Essence','Fire Essence','Living Essence','Burning vine','Ogres thumb','Ghouls claw','Rabbit droppings','Starlight dust','Archmages hair','Crystalized vine','Ghost nettle ','Fire Scale','Scattered Dragonscale ','Cobalt silversage','Pheonix Ashes','Decaying Lichweed'];

  let choice = Math.floor(Math.random()*choices_array.length);

  return choices_array[choice];
}

export default class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score : 0,
      interval : null,
      timeRemaining : 30,
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

    this.startGame = this.startGame.bind(this);
    this.generateCard = this.generateCard.bind(this);
    this.discard = this.discard.bind(this);

    this.generateHand = this.generateHand.bind(this);
    this.moveToPlay = this.moveToPlay.bind(this);

    this.d20 = this.d20.bind(this);
    this.tick = this.tick.bind(this);
    this.checkScore = this.checkScore.bind(this);
  }

  componentDidMount(){
    this.startGame();
    ua_track("Game", "Started");
  }

  componentWillUnmount(){
    ua_track("Session", this.state.score);
  }

  startGame(){
    this.setState({
      blackCards : this.generateHand("black"),
      whiteCards : this.generateHand("white"),
      blueCards : this.generateHand("blue"),
      redCards : this.generateHand("red"),
      target : this.generateTarget(),
      base : this.generateBase()
    });

    clearInterval(this.state.interval);
    this.setState({ timeRemaining : 30, interval: setInterval(this.tick, 1000) });
  }

  tick(){
    if (this.state.timeRemaining > 0){
      this.setState({ timeRemaining: this.state.timeRemaining - 1 });
    } else {
      this.startGame();
    }
  }

  d20(){
    return Math.round(Math.random() * (20 - 0) + 0);
  }

  checkScore(){
    let base = this.state.base;
    let target = this.state.target; 
    let score = this.state.score;

    if(this.state.timeRemaining > 0){
      if(base[0].props.attack > target[0].props.attack){
        if(base[0].props.cost < target[0].props.cost){
          this.setState({ score : score + 10 });
          this.startGame();
        } else {
          this.setState({ score : score - 10 });
          this.startGame();
        }
      }
    }
  }

  discard(colour, current){
    let handInterim = [];

    if(colour === "blue"){
      handInterim = this.state.blueCards;
      handInterim.splice(current, 1);
      handInterim.push(this.generateCard(colour));
      this.setState({blueCards: handInterim});
    } else if(colour === "red"){
      handInterim = this.state.redCards;
      handInterim.splice(current, 1);
      handInterim.push(this.generateCard(colour));
      this.setState({redCards: handInterim}); 
    } else if(colour === "black"){
      handInterim = this.state.blackCards; 
      handInterim.splice(current, 1);
      handInterim.push(this.generateCard(colour));
      this.setState({blackCards: handInterim});
    } else if(colour === "white"){
      handInterim = this.state.whiteCards;
      handInterim.splice(current, 1);
      handInterim.push(this.generateCard(colour));
      this.setState({whiteCards: handInterim});
    }

    return true;
  }

  generateCard(colour){
    let id = generateRandomID();
    let ap = Math.round(Math.random() * (50 - 10) + 10);
    let hp = Math.round(Math.random() * (30 - 10) + 10);
    let xp = Math.round(Math.random() * (30 - 10) + 10);
    let cost = Math.round(Math.random() * (25 - 10) + 25);

    let card = <Card 
      key = {id}
      unique = {id}
      name = {generateName()}
      moveToPlay={() => this.moveToPlay(colour, id)}
      discard={() => this.discard(colour, id)}
      health = {hp}
      attack = {ap}
      xp = {xp}
      cost = {cost}
      player = {colour} />;

    return card;
  }

  moveToPlay(colour, current){
    let newBase = [];
    let new_card = [];
    let handInterim = [];

    if(colour === "blue"){ 
      handInterim = this.state.blueCards; 
    } else if(colour === "red"){
      handInterim = this.state.redCards; 
    } else if(colour === "black"){
      handInterim = this.state.blackCards; 
    } else if(colour === "white"){ 
      handInterim = this.state.whiteCards;
    }

    handInterim.map((row, i) => {
      if(row.key === current){
        if(this.state.base !== []){
          let new_attack = handInterim[i].props.attack;
          let new_health = handInterim[i].props.health;
          let new_xp = handInterim[i].props.xp;
          let new_cost = handInterim[i].props.cost;

          let base_card = this.state.base[0];

          new_attack += base_card.props.attack;
          new_health += base_card.props.health;
          new_xp += base_card.props.xp;
          new_cost += base_card.props.cost;

          new_card = <Card 
            key = {generateRandomID()}
            unique = {generateRandomID()}
            check={() => this.checkScore()}
            name = "Your Potion"
            health = {new_health}
            attack = {new_attack}
            xp = {new_xp}
            cost = {new_cost}
            type = "base"
            player = "black" />;
        }
      }

      return current;
    });

    newBase.push(new_card);
    handInterim.splice(current, 1);
    handInterim.push(this.generateCard(colour));

    if(colour === "blue"){
      this.setState({
        base : newBase,
        blueCards : handInterim
      });
    } else if(colour === "red"){
      this.setState({
        base : newBase,
        redCards : handInterim
      });
    } else if(colour === "black"){
      this.setState({
        base : newBase,
        blackCards : handInterim
      });
    } else if(colour === "white"){
      this.setState({
        base : newBase,
        whiteCards : handInterim
      });
    }

    this.checkScore();
  }

  generateTarget(){
    let id = generateRandomID();
    let ap = Math.round(Math.random() * (350 - 100) + 100);
    let hp = Math.round(Math.random() * (350 - 100) + 100);
    let xp = Math.round(Math.random() * (300 - 100) + 100);
    let cost = Math.round(Math.random() * (250 - 100) + 100);

    let card = <Dialog 
          key = {id}
          unique = {id}
          name = {generateName()}
          attack = {hp}
          stat2 = {ap}
          stat3 = {xp}
          restart = {() => this.startGame()}
          cost = {cost}
          player = "white" />;

    let hand = [];
    hand.push(card);
    return hand;
  } 

  generateBase(){
    let id = generateRandomID();
    let ap = 10;
    let hp = 10;
    let xp = 10;
    let cost = Math.round(Math.random() * (40 - 10) + 10);

    let card = <Card 
      key = {id}
      unique = {id}
      name = "Your Potion"
      attack = {ap}
      health = {hp}
      cost = {cost}
      xp = {xp}
      restart={() => this.startGame()}
      moveToPlay={() => this.moveToPlay("base", id)}
      type = "base"
      player = "black"/>;

    let hand = [];
    hand.push(card);
    return hand;
  }

  generateHand(colour){
    let hand = [];
    hand.push(this.generateCard(colour));
    return hand;
  }

  render() {
    return (
      <div className="container center">
        <img onClick={() => this.startGame()} alt="Elixir" className="logo" src={logo}/>
        <div className="subtitle">a quick-paced potion-brewing card game</div>
        <div className="bar center">
          <div className="time">
            Time remaining: {this.state.timeRemaining} seconds
            <br /><br />
            Current score: {this.state.score} points
          </div>
        </div>
       
        <div className="play-container">
          <div className="items">
            <div className="white-play item animated slideInLeft">
              {this.state.target}
            </div>

            <div className="black-play item animated slideInRight">
              {this.state.base}
            </div>
          </div>
        </div>

        <div className="hand-container items center">
          <div className="instruction-header">Click on a card to add ingredients to your potion</div>
          <br/>
          <div className="hand white-hand item animated flipInX">
            {this.state.whiteCards}
          </div>

          <div className="hand blue-hand item animated flipInX">
            {this.state.blueCards}
          </div>

          <div className="hand red-hand item animated flipInX">
            {this.state.redCards}
          </div>

          <div className="hand black-hand item animated flipInX">
            {this.state.blackCards}
          </div>

        </div>
      </div>
    );
  }
}