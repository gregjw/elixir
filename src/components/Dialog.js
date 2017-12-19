import React, { Component } from 'react';
import '../css/Dialog.css';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name  : this.props.name,
      character : "mage",
      attack : this.props.attack,
      health : this.props.health,
      stamina : this.props.stamina,
      cost : this.props.cost
    }
  }

  render() {
    return (
      <div className="dialog">
        <div className="descriptor">A {this.state.character} walks in and croaks </div>
        I need a potion with at least <span className="dialog-stat text-attack">{this.state.attack}</span> as well as 
        <span className="dialog-stat text-health"> {this.state.cost}</span> but please, dont exceed <span className="dialog-stat text-agility">{this.state.cost}</span>.
        <br/><br/>
        Times are tough for a {this.state.character} like me.
      </div>
    );
  }
}