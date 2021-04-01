import React, { Component } from "react";

export default class eventForm extends Component {
  debugger;
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="widget-box-full" onClick={this.handleClick}>
        <div className="modal_content">
          <p className="sample-select">{`${this.props.activeDate}`}</p>
        </div>
      </div>
    );
  }
}
