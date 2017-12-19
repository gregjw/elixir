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
        <div className="descriptor"> A {this.state.character} walks in and croaks </div>
        I need a potion with <div className="stat dialog-stat attack">{this.state.stat1}</div> as well as 
        <div className="stat dialog-stat health">{this.state.stat2}</div> but dont exceed <div className="stat dialog-stat attack">{this.state.stat1}</div>
      </div>
    );
  }
}