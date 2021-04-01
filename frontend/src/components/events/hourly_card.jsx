import React, { Component } from "react";

export default class hourly_card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  createHourly() {
    for (let i = 1; i < 13; i++) {
      console.log(i * 3);
    }
  }

  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="widget-box-full" onClick={this.handleClick}>
        <div className="hourly-report">
          <div>
            <h1>Name of Event</h1>
            <p className="sample-select">{`${this.props.activeDate}`}</p>
          </div>
          <textarea className="sample-desc"></textarea>
          <ul></ul>
          <button>Save Event</button>
        </div>
      </div>
    );
  }
}
