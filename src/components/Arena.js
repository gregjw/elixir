import React, { Component } from 'react';
import '../css/Arena.css';
import _ from 'lodash';

import Card from './Card.js';

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

  generateHand(colour){
    var hand = [];

    if(colour === "black"){
      _.times(4, i =>
        hand.push(<Card player="black" onClick={this.moveToPlay("black")}/>)
      );
    } else {
      _.times(4, i =>
        hand.push(<Card player="white" onClick={this.moveToPlay("white")}/>)
      );
    }

    return hand;
  }


  moveToPlay(colour){
    if(colour === "black"){
      this.setState({
        bCardsInPlay : <Card player="black" />
      });
    } else {
      this.setState({
        wCardsInPlay : <Card player="white" />
      });
    }
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
