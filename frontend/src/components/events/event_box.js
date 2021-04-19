import React from "react";

class EventBox extends React.Component {
  render() {
    debugger;
    return (
      <ul className="event-card">
        <li key={`${this.props.id}-title`}>{this.props.title}</li>
        <li key={`${this.props.id}-desc`}>{this.props.description}</li>
        <li key={`${this.props.id}-date`}>
          {`${new Date(this.props.date).toDateString()} at ${new Date(
            this.props.date
          ).toLocaleTimeString()}`}
        </li>
        <div key={`${this.props.id}-lb`} className="linebreak"></div>
      </ul>
    );
  }
}

export default EventBox;
