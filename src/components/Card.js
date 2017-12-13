import React, { Component } from 'react';
import '../css/Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unique : this.props.unique,
      player : this.props.player,
      attack : 15,
      health : 20
    }
  }

  render() {
    return (
      <div onClick={this.props.moveToPlay} className={this.state.player + "-card"}>
        <div className="unique">{this.state.unique} {this.props.card}</div>
        <div className="center">
          <div className="attack">{this.state.attack}</div>
          <div className="health">{this.state.health}</div>
        </div>
      </div>
    );
  }
}