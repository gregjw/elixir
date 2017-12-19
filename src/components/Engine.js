import React, { Component } from 'react';
// import _ from 'lodash';

import '../css/Engine.css';
import Card from './Card.js';
import Dialog from './Dialog.js';
import logo from '../assets/d20.png';

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
      focus : [],
      turn : "black",
      interval : null,
      timeRemaining : 30,
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
    this.restart = this.restart.bind(this);

    this.generateCard = this.generateCard.bind(this);
    this.discard = this.discard.bind(this);

    this.generateHand = this.generateHand.bind(this);
    this.moveToPlay = this.moveToPlay.bind(this);
    this.checkScore = this.checkScore.bind(this);

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
    this.setState({ timeRemaining : 30, interval: setInterval(this.tick, 1000) });
  }

  tick(){
    if (this.state.timeRemaining > 0){
      this.setState({ timeRemaining: this.state.timeRemaining - 1 });
    } else {
      clearInterval(this.state.interval);
    }
  }

  restart(){
    this.setState({ timeRemaining : 30 });
  }

  d20(){
    return Math.round(Math.random() * (20 - 0) + 0);
  }

  checkScore(){
    let base = this.state.base;
    let target = this.state.target; 
    let score = this.state.score;

    if(base[0].props.attack > target[0].props.stat1){
      if(base[0].props.cost < target[0].props.stat4){
        let base = this.generateBase("black");

        let target = this.generateTarget("white");

        this.setState({ score : score + 10, base : base, target: target});
        this.startTimer();
      } else {
        let base = this.generateBase("black");

        let target = this.generateTarget("white");

        this.setState({ score : score - 10, base : base, target: target});
        this.startTimer();
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

    return false;
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

  moveToPlay(card, current){
    let newBase = [];
    let new_card = [];
    let handInterim = [];

    if(card === "blue"){ 
      handInterim = this.state.blueCards; 
    } else if(card === "red"){
      handInterim = this.state.redCards; 
    } else if(card === "black"){
      handInterim = this.state.blackCards; 
    } else if(card === "white"){ 
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
          console.log(base_card);
          new_attack += base_card.props.attack;
          new_health += base_card.props.health;
          new_xp += base_card.props.xp;
          new_cost += base_card.props.cost;

          new_card = <Card 
            key = {generateRandomID()}
            unique = {generateRandomID()}
            check={() => this.checkScore()}
            name = "Current Potion"
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
    handInterim.push(this.generateCard(card));

    if(card === "blue"){
      this.setState({
        base : newBase,
        blueCards : handInterim
      });
    } else if(card === "red"){
      this.setState({
        base : newBase,
        redCards : handInterim
      });
    } else if(card === "black"){
      this.setState({
        base : newBase,
        blackCards : handInterim
      });
    } else if(card === "white"){
      this.setState({
        base : newBase,
        whiteCards : handInterim
      });
    }
  }

  generateTarget(colour){
    let id = generateRandomID();
    let ap = Math.round(Math.random() * (350 - 100) + 100);
    let hp = Math.round(Math.random() * (350 - 100) + 100);
    let xp = Math.round(Math.random() * (300 - 100) + 100);
    let cost = Math.round(Math.random() * (250 - 100) + 250);

    let card = <Dialog 
          key = {id}
          unique = {id}
          name = {generateName()}
          stat1 = {hp}
          stat2 = {ap}
          stat3 = {xp}
          stat4 = {cost}
          player = {colour} />;

    let hand = [];
    hand.push(card);
    return hand;
  } 

  generateBase(colour){
    let id = generateRandomID();
    let ap = 10;
    let hp = 10;
    let xp = 10;
    let cost = 25;

    let card = <Card 
          key = {id}
          unique = {id}
          name = "Current Potion"
          attack = {ap}
          health = {hp}
          cost = {cost}
          xp = {xp}
          check={() => this.checkScore()}
          moveToPlay={() => this.moveToPlay("base", id)}
          type = "base"
          player = {colour} />;

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
        <img onClick={() => this.restart()} alt="Elixir" className="logo" src={logo}/>
        <div className="subtitle">a quick-paced potion-brewing card game</div>
        <div className={"bar-" +  this.state.turn + " center" }>
          <div className="time">
            Time remaining
            <br /><br />
            {this.state.timeRemaining} seconds
          </div>
        </div>
        <div className="score center">{this.state.score}</div>

        <div className="play-container">
          <div className="white-play">
            {this.state.target}
          </div>

          <div className="black-play">
            {this.state.base}
          </div>
        </div>

        <div className="hand-container center">
          <div className="ingredient-text">Click to add ingredients to your current potion</div>

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