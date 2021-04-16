import React, { Component } from "react";
import CreateEvent from "../events/create_event_container";

export default class dailyCard extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="cal-popup">
        <p
          onClick={this.handleClick}
          className="sample-select"
        >{`${this.props.activeDate}`}</p>
        <CreateEvent />
      </div>
    );
  }
}
