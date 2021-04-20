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

  render() {
    return (
      <div>
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
