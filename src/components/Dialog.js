import React, { Component } from 'react';
import '../css/Dialog.css';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name  : this.props.name,
      character : "mage",
      stat1 : this.props.stat1,
      stat2 : this.props.stat2,
      stat3 : this.props.stat3,
      stat4 : this.props.stat4
    }
  }

  render() {
    return (
      <div className="dialog">
        <div className="descriptor">A {this.state.character} walks in and croaks </div>
        I need a potion with at least <span className="dialog-stat text-attack">{this.state.stat1}</span> as well as 
        <span className="dialog-stat text-health"> {this.state.stat4}</span> but please, dont exceed <span className="dialog-stat text-agility">{this.state.stat4}</span>.
        <br/><br/>
        Times are tough for a {this.state.character} like me.
      </div>
    );
  }
}