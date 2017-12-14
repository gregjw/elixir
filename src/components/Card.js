import React, { Component } from 'react';
import '../css/Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player : this.props.player,
      name   : this.props.name,
      attack : this.props.attack,
      health : this.props.health
    }
  }

  render() {
    return (
      <div
        onClick = {this.props.moveToPlay}
        onDoubleClick = {this.props.attackOpponent}
        className = {this.state.player + "-card noselect"}>
        <div className="unique">{this.state.name}</div>
        <div className="center">
          <div className="stat attack">{this.state.attack}</div>
          <div className="stat health">{this.state.health}</div>
          <br/><br/><br/>
          <div className="stat stamina">{this.state.attack}</div>
          <div className="stat agility">{this.state.health}</div>
        </div>
      </div>
    );
  }
}