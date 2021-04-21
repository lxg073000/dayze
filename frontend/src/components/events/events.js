import React from "react";
import { withRouter } from "react-router-dom";
import EventItem from "./event_item_container";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterToday = this.filterToday.bind(this);
    this.filterAll = this.filterAll.bind(this);
  }

  componentDidMount() {
    debugger;
    // this.props.fetchUserEvents(this.props.currentUser.id);
    this.setState({ events: this.props.events });
    debugger;
  }

  // componentDidUpdate() {
  //   this.setState({ events: this.props.events });
  //   // debugger;
  //   // console.log("mounted");
  //   console.log(this.state);
  // }
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
  filterToday() {
    this.props.fetchTodays();
  }
  filterAll() {
    debugger;
    this.props.fetchUserEvents(this.props.currentUser.id);
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
            onClick={this.handleFilter}
          ></i>
          <i
            className="fab fas fa-calendar-alt"
            id="all"
            onClick={this.filterAll}
          ></i>
        </span>
        <h1 className="event-list-headline">All Events</h1>

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
