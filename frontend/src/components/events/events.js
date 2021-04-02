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

  componentWillMount() {
    debugger;
    this.props.fetchUserEvents(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {
    this.setState({ events: newState.events });
  }

  render() {
    return (
      <div>
        <h1 className="event-list-headline">...upcoming events</h1>
        {this.state.events.map((evnt) => (
          <EventBox
            key={evnt.id}
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
