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
    this.handleLinkGoogleCal = this.handleLinkGoogleCal.bind(this);
    this.filterMonth = this.filterMonth.bind(this);
    this.filterWeek = this.filterWeek.bind(this);
    this.filterToday = this.filterToday.bind(this);
    this.filterAll = this.filterAll.bind(this);
  }

  componentDidMount() {
    this.setState({ events: this.props.events });
    document.getElementById("all").classList.toggle("activated");
    document.getElementById("all").classList.toggle("no-click");
  }

  UNSAFE_componentWillReceiveProps(newState) {
    this.setState({ events: newState.events });
    //if event was added >> ajax filter call but ONLY once
    if (this.props.switched) {
      switch (this.state.filter) {
        case "All Events":
          this.props.fetchUserEvents(this.props.currentUser.id);
          this.props.toggleSwitched();
          break;
        case "This Month's Events":
          this.props.fetchMonth(this.props.currentUser.id);
          this.props.toggleSwitched();
          break;
        case "This Week's Events":
          this.props.fetchWeek(this.props.currentUser.id);
          this.props.toggleSwitched();
          break;
        case "Today's Events":
          this.props.fetchTodays(this.props.currentUser.id);
          this.props.toggleSwitched();
          break;
        default:
          break;
      }
    }
  }

  handleDelete(id) {
    this.props.deleteEvent(id, {
      isLinkedGoogleAccount: this.props.currentUser.isLinkedGoogleAccount,
    });
  }

  handleLinkGoogleCal() {
    this.props.linkGoogleCal();
  }

  filterWeek() {
    this.props.fetchWeek(this.props.currentUser.id);
    this.setState({ filter: "This Week's Events" });
    document.getElementById("week").classList.toggle("activated");
    document.getElementById("week").classList.toggle("no-click");
    document.getElementById("day").classList.remove("activated", "no-click");
    document.getElementById("month").classList.remove("activated", "no-click");
    document.getElementById("all").classList.remove("activated", "no-click");
  }
  filterToday() {
    this.props.fetchTodays(this.props.currentUser.id);
    this.setState({ filter: "Today's Events" });
    document.getElementById("day").classList.toggle("activated");
    document.getElementById("day").classList.toggle("no-click");
    document.getElementById("week").classList.remove("activated", "no-click");
    document.getElementById("month").classList.remove("activated", "no-click");
    document.getElementById("all").classList.remove("activated", "no-click");
  }
  filterMonth() {
    this.props.fetchMonth(this.props.currentUser.id);
    this.setState({ filter: "This Month's Events" });
    document.getElementById("month").classList.toggle("activated");
    document.getElementById("month").classList.toggle("no-click");
    document.getElementById("all").classList.remove("activated", "no-click");
    document.getElementById("day").classList.remove("activated", "no-click");
    document.getElementById("week").classList.remove("activated", "no-click");
  }
  filterAll() {
    this.props.fetchUserEvents(this.props.currentUser.id);
    this.setState({ filter: "All Events" });
    document.getElementById("all").classList.toggle("activated");
    document.getElementById("all").classList.toggle("no-click");
    document.getElementById("day").classList.remove("activated", "no-click");
    document.getElementById("month").classList.remove("activated", "no-click");
    document.getElementById("week").classList.remove("activated", "no-click");
  }

  render() {
    return (
      <div className="event-display-window">
        <span className="event-filter-bar">
          <i
            className="fas fa-calendar"
            id="all"
            alt="All Events"
            title="All Events"
            onClick={this.filterAll}
          ></i>
          <i
            className="fab fas fa-calendar-alt"
            id="month"
            alt="Events This Month"
            title="Events This Month"
            onClick={this.filterMonth}
          ></i>
          <i
            className="fab fas fa-calendar-week"
            alt="Event This Week"
            title="Event This Week"
            id="week"
            onClick={this.filterWeek}
          ></i>
          <i
            className="fab fas fa-calendar-day"
            alt="Today's Events"
            title="Today's Events"
            id="day"
            onClick={this.filterToday}
          ></i>
          {!this.props.currentUser.isLinkedGoogleAccount ? (
            <i
              className="fas fa-link"
              id="link"
              title="Sync Google Calendar"
              alt="Sync Google Calendar"
              onClick={this.handleLinkGoogleCal}
            ></i>
          ) : null}
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
            updateEvent={this.props.updateEvent}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(Event);
