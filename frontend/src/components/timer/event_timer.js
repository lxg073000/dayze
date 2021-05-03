import React from "react";
import Notifications from "../notifications/notification";

export default class EventTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdTimers: this.props.eventTimers,
    };
    this.handleEventTimer = this.handleEventTimer.bind(this);
    this.createNotifications = this.createNotifications.bind(this);
  }

  componentDidMount() {
    //get all filtered upcoming events
    this.props.timerByHalfHour.forEach((event) => {
      this.handleEventTimer(event);
    });

    this.handleEventTimer(this.props.timerByHour);
    this.props.createEventTimer(this.props.timerByHour);
    //create timeouts
    //props.createSetTimeoutID
  }
  handleEventTimer(event) {
    //create setTimeout and grab timeout ID
    ////// event name, desc, time

    //create eventTimerObject for dispatch
    ///// eventId, setTimeoutID
    let eventTimeoutID = setTimeout(() => {}, this.createNotifications(event));
    let eventTimer = {
      [event.id]: eventTimeoutID,
    };

    this.props.createEventTimer(eventTimer);
  }

  createNotifications(event) {
    let currentTime = new Date();
    let timeUntil = event.notificationTime - currentTime;
    return timeUntil;
  }

  render() {
    return (
      <div>
        <Notifications />
      </div>
    );
  }
}
