import React, { Component } from "react";

export default class dailyCard extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="widget-box-full" onClick={this.handleClick}>
        <div>
          <p className="sample-select">{`${this.props.activeDate}`}</p>
        </div>
      </div>
    );
  }
}
