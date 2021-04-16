import React, { Component } from "react";

export default class dailyCard extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="cal-popup" onClick={this.handleClick}>
        <p className="sample-select">{`${this.props.activeDate}`}</p>
      </div>
    );
  }
}
