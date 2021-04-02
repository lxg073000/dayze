import React from "react";

class EventBox extends React.Component {
  render() {
    return (
      <ul className="event-card">
        <li key={this.props.date}>{this.props.title}</li>
        <li key={this.props.date}>{this.props.description}</li>
        <li key={this.props.date}>{this.props.date.toString()}</li>
        <div className="linebreak"></div>
      </ul>
    );
  }
}

export default EventBox;
