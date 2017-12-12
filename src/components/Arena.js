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
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}
