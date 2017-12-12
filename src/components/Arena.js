import React, { Component } from 'react';
import '../css/Arena.css';
import _ from 'lodash';

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
          {_.times(2, i =>
            <Card player="white" />
          )}
        </div>

        <div className="black-container">
          {_.times(4, i =>
            <Card player="black" />
          )}
        </div>
      </div>
    );
  }
}
