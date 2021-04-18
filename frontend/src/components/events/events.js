import React from "react";
import { withRouter } from "react-router-dom";
import EventBox from "./event_box";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    debugger;
    this.props.fetchUserEvents(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {
    debugger;
    this.setState({ events: newState.events });
    console.log(this.state);
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
          />
        ))}
      </div>
    );
  }
}

export default withRouter(Event);
