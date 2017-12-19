import React, { Component } from 'react';
import '../css/Dialog.css';

function generateName(){
  let choices_array = ['mage','wizard','knight','strange man','strange woman','mysterious old woman','mysterious old man'];
  let choice = Math.floor(Math.random()*choices_array.length);
  return choices_array[choice];
}

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name  : this.props.name,
      character : generateName(),
      mana : this.props.stat1,
      health : this.props.stat2,
      stamina : this.props.stat3,
      cost : this.props.cost
    }
  }

  render() {
    return (
      <div onClick={this.props.restart} className="dialog animated slideInLeft">
        <div className="descriptor">A {this.state.character} walks in and croaks </div>

        I need a potion with at least <span className="dialog-stat text-mana">{this.state.mana} mana</span> as well as 
        <span className="dialog-stat text-stamina"> {this.state.stamina} stamina</span> but please, dont exceed <span className="dialog-stat text-agility">{this.state.cost} coins</span>.
        
        <br/><br/>

        Times are tough for a {this.state.character} like me.
      </div>
    );
  }
}