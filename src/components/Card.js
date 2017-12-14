import React, { Component } from 'react';
import '../css/Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.randomAttack = this.randomAttack.bind(this);
    this.randomHealth = this.randomHealth.bind(this);
    this.generateName = this.generateName.bind(this);

    this.state = {
      name : this.generateName(),
      unique : this.props.unique,
      player : this.props.player,
      attack : this.randomAttack(),
      health : this.randomHealth()
    }
  }

  generateName(){
    var choices =
    ['Defile','Wrath','Adapt','Valeera','Maex','Neiv','Vox','Eim','Rot'];

    var generated = choices[Math.floor(Math.random()*choices.length)];
    return generated;
  }

  randomAttack(){
    return Math.round(Math.random() * (30 - 10) + 10);
  }

  randomHealth(){
    return Math.round(Math.random() * (30 - 10) + 10);
  }

  render() {
    return (
      <div onDoubleClick={this.props.moveToPlay} className={this.state.player + "-card"}>
        <div className="unique">{this.state.unique}</div>
        <div className="center">
          <div className="attack">{this.state.attack}</div>
          <div className="health">{this.state.health}</div>
        </div>
      </div>
    );
  }
}