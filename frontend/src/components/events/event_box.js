import React from "react";

class EventBox extends React.Component {
  render() {
    debugger;
    return (
      <ul className="event-card">
        <li key={`${this.props.id}-title`}>{this.props.title}</li>
        <li key={`${this.props.id}-desc`}>{this.props.description}</li>
        <li key={`${this.props.id}-date`}>{this.props.date.toString()}</li>
        <div key={`${this.props.id}-lb`} className="linebreak"></div>
      </ul>
    );
  }
}

export default EventBox;
