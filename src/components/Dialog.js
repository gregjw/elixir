import React, { Component } from 'react';
import '../css/Dialog.css';

function generateName(){
  let choices_array = ['mage','wizard','knight','strange man','strange woman','mysterious old woman','mysterious old man'];
  let choice = Math.floor(Math.random()*choices_array.length);
  return choices_array[choice];
}

function generateDescriptor(){
  let choices_array = ['croaks','screams','yells','whispers','shouts'];
  let choice = Math.floor(Math.random()*choices_array.length);

  return choices_array[choice];
}

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name  : this.props.name,
      character : generateName(),
      mana : this.props.mana,
      health : this.props.health,
      stamina : this.props.stamina,
      cost : this.props.cost,
      descriptor : generateDescriptor()
    }
  }

  render() {
    return (
      <div onClick={this.props.restart} className="dialog animated slideInLeft">
        <div className="descriptor">A {this.state.character} walks in and {this.state.descriptor} </div>

        I need a potion with at least <span className="dialog-stat text-mana">{this.state.mana} mana</span> but please, dont exceed <span className="dialog-stat text-agility">{this.state.cost} coins</span>.
        
        <br/><br/>

        Times are tough for a {this.state.character} like me.
      </div>
    );
  }
}