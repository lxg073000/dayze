import React from "react";
import { withRouter } from "react-router-dom";
import EventItem from "./event_item_container";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      filter: "All Events",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.filterWeek = this.filterWeek.bind(this);
    this.filterToday = this.filterToday.bind(this);
    this.filterAll = this.filterAll.bind(this);
  }

  componentDidMount() {
<<<<<<< HEAD
    //debugger;
    this.props.fetchUserEvents(this.props.currentUser.id);
=======
    debugger;
    this.setState({ events: this.props.events });
    debugger;
>>>>>>> display-events
  }

  UNSAFE_componentWillReceiveProps(newState) {
    //debugger;
    this.setState({ events: newState.events });
  }

  handleDelete(id) {
    this.props.deleteEvent(id);
  }

  filterWeek(e) {
    this.props.fetchWeek();
    this.setState({ filter: "This Week's Events" });
  }
  filterToday() {
    this.props.fetchTodays();
    this.setState({ filter: "Today's Events" });
  }
  filterAll() {
    this.props.fetchUserEvents(this.props.currentUser.id);
    this.setState({ filter: "All Events" });
  }

  render() {
    return (
      <div className="event-display-window">
        <span className="event-filter-bar">
          <i
            className="fab fas fa-calendar-day"
            id="day"
            onClick={this.filterToday}
          ></i>
          <i
            className="fab fas fa-calendar-week"
            id="week"
            onClick={this.filterWeek}
          ></i>
          <i
            className="fab fas fa-calendar-alt"
            id="all"
            onClick={this.filterAll}
          ></i>
        </span>
        <h1 className="event-list-headline">{this.state.filter}</h1>

        {this.state.events.map((evnt, idx) => (
          <EventItem
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
