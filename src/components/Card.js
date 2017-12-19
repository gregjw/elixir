import React, { Component } from 'react';
import '../css/Card.css';
import '../css/Animation.css';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player : this.props.player,
      name   : this.props.name,
      mana : this.props.mana,
      health : this.props.health,
      stamina : this.props.stamina,
      cost : this.props.cost
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({health: newProps.health});
  }

  render() {
    let clickFunction = this.props.moveToPlay;

    if(this.props.type === "base"){
      clickFunction = this.props.restart;
    } else {
      clickFunction = this.props.moveToPlay;
    }

    return (
      <div
        onClick = {clickFunction}
        onContextMenu = {this.props.discard}
        className = {"card " + this.state.player + "-card noselect animated flipInX"}>
        <div className="card-name">{this.state.name}</div>
        <div className="center">
          <div className="stat mana">{this.state.mana}</div>
          <div className="stat health">{this.state.health}</div>
          <br/><br/><br/>
          <div className="stat stamina">{this.state.stamina}</div>
          <div className="stat agility">{this.state.cost}</div>
        </div>
      </div>
    );
  }
}