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
    this.filterMonth = this.filterMonth.bind(this);
    this.filterWeek = this.filterWeek.bind(this);
    this.filterToday = this.filterToday.bind(this);
    this.filterAll = this.filterAll.bind(this);
  }

  componentDidMount() {
    // debugger;
    this.setState({ events: this.props.events });
    document.getElementById("all").classList.toggle("activated");
    // debugger;
  }

  UNSAFE_componentWillReceiveProps(newState) {
    //debugger;
    this.setState({ events: newState.events });
  }

  handleDelete(id) {
    this.props.deleteEvent(id);
  }

  filterWeek() {
    this.props.fetchWeek(this.props.currentUser.id);
    this.setState({ filter: "This Week's Events" });
    document.getElementById("week").classList.toggle("activated");
    document.getElementById("day").classList.remove("activated");
    document.getElementById("month").classList.remove("activated");
    document.getElementById("all").classList.remove("activated");
  }
  filterToday() {
    this.props.fetchTodays(this.props.currentUser.id);
    console.log(this.props.currentUser.id);
    this.setState({ filter: "Today's Events" });
    document.getElementById("day").classList.toggle("activated");
    document.getElementById("week").classList.remove("activated");
    document.getElementById("month").classList.remove("activated");
    document.getElementById("all").classList.remove("activated");
  }
  filterMonth() {
    this.props.fetchMonth(this.props.currentUser.id);
    this.setState({ filter: "This Month's Events" });
    document.getElementById("month").classList.toggle("activated");
    document.getElementById("all").classList.remove("activated");
    document.getElementById("day").classList.remove("activated");
    document.getElementById("week").classList.remove("activated");
  }
  filterAll() {
    this.props.fetchUserEvents(this.props.currentUser.id);
    this.setState({ filter: "All Events" });
    document.getElementById("all").classList.toggle("activated");
    document.getElementById("day").classList.remove("activated");
    document.getElementById("month").classList.remove("activated");
    document.getElementById("week").classList.remove("activated");
  }

  render() {
    return (
      <div className="event-display-window">
        <span className="event-filter-bar">
          <i className="fas fa-calendar" id="all" onClick={this.filterAll}></i>
          <i
            className="fab fas fa-calendar-alt"
            id="month"
            onClick={this.filterMonth}
          ></i>
          <i
            className="fab fas fa-calendar-week"
            id="week"
            onClick={this.filterWeek}
          ></i>
          <i
            className="fab fas fa-calendar-day"
            id="day"
            onClick={this.filterToday}
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
