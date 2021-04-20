import React from "react";
import { withRouter } from "react-router-dom";
import EventBox from "./event_box";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    debugger;
    this.props.fetchUserEvents(this.props.currentUser.id);
  }

  UNSAFE_componentWillReceiveProps(newState) {
    debugger;
    this.setState({ events: newState.events });
  }

  handleDelete(id) {
    this.props.deleteEvent(id);
  }

  handleFilter(e) {
    console.log(e.target.id);
  }

  render() {
    return (
      <div className="event-display-window">
        <span className="event-filter-bar">
          <i
            className="fab fas fa-calendar-day"
            id="day"
            onClick={this.handleFilter}
          ></i>
          <i
            className="fab fas fa-calendar-week"
            id="week"
            onClick={this.handleFilter}
          ></i>
          <i
            className="fab fas fa-calendar-alt"
            id="all"
            onClick={this.handleFilter}
          ></i>
        </span>
        <h1 className="event-list-headline">All Events</h1>

        {this.state.events.map((evnt, idx) => (
          <EventBox
            key={idx}
            id={evnt._id}
            title={evnt.title}
            description={evnt.description}
            date={evnt.date}
            currentUser={this.props.currentUser}
            handleDelete={this.handleDelete}
            handleUpdate={this.props.updateEvent}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(Event);
