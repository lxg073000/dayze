import React from "react";

class EventBox extends React.Component {
  handleEdit() {}
  handleClick(e) {
    debugger;
    this.props.handleDelete(e.target.id);
  }
  render() {
    debugger;
    return (
      <ul className="event-card">
        <li key={`${this.props.id}-title`}>
          {this.props.title}
          <span className="event-tools">
            <i className="fas fa-edit"></i>
            <i
              onClick={(e) => this.handleClick(e)}
              id={this.props.id}
              className="far fa-calendar-times"
            ></i>
          </span>
        </li>
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
