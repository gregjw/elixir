import React, { Component } from 'react';
import '../css/Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player : this.props.player,
      character : this.props.name,
      attack : this.props.attack,
      health : this.props.health
    }
  }

  render() {
    return (
      <div onClick={this.props.moveToPlay} className={this.state.player + "-card"}>
        <div className="unique">{this.state.character} [{this.props.unique}]</div>
        <div className="center">
          <div className="attack">{this.state.attack}</div>
          <div className="health">{this.state.health}</div>
        </div>
      </div>
    );
  }
}