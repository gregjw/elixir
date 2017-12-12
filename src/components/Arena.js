import React, { Component } from 'react';
import '../css/Arena.css';

import Card from './Card.js';

export default class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bHealth : [],
      wHealth : [],
      bCardsInHand : [],
      bCardsInPlay : [],
      wCardsInHand : [],
      wCardsInPlay : []
    };

    this.generateHand = this.generateHand.bind(this);
  }

  generateHand(){
    var hand = [];
    return hand;
  }

  render() {
    return (
      <div className="container center">
        <div className="white-container">
          <Card player="white"/>
          <Card player="white"/>
        </div>

        <div className="black-container">
          <Card player="black"/>
          <Card player="black"/>
        </div>
      </div>
    );
  }
}
