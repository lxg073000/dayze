import React from "react";
import Notifications from "../notifications/notification";

export default class EventTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEventTimer = this.handleEventTimer.bind(this);
    this.createNotifications = this.createNotifications.bind(this);
    this.createQueryString = this.createQueryString.bind(this);
  }

  componentDidMount() {
    //get all filtered upcoming events
    debugger;

    let eventReminders = {};

    let eventList = this.props.eventsInHalfHour.concat(
      this.props.eventsInQuarterHour
    );

    eventList.forEach((event) => {
      if (eventReminders[event.id]) {
        eventReminders[event.id].push(this.handleEventTimer(event));
      }
      eventReminders[event.id] = [this.handleEventTimer(event)];
    });

    this.props.createEventTimers(eventReminders);
    // this.props.eventsByHalfHour.forEach((event) => {
    //   this.handleEventTimer(event);
    // });

    // this.props.eventsByHour.forEach((event) => {
    //   this.handleEventTimer(event);
    // });
  }

  //for (const [key, val] of Object.entries(eventReminders)) {
  //   let eventTimer = {
  //     [key]: val,
  //   };
  // }
  UNSAFE_componentWillReceiveProps(newState) {
    debugger;
    //compare old to new state
    //pass array formated changes to prev used code
  }

  handleEventTimer(event) {
    //create setTimeout and grab timeout ID
    ////// event name, desc, time

    //create eventTimer and open new window at expiration.
    let eventTimeoutID = setTimeout(() => {
      window.open(`localhost:3000/${this.createQueryString(event)}`);
    }, this.createNotifications(event));

    return eventTimeoutID;
  }

  createNotifications(event) {
    let currentTime = new Date();
    let timeUntil = event.notificationTime - currentTime;
    return timeUntil;
  }

  createQueryString(event) {
    let desc = encodeURIComponent(event.description);
    let title = encodeURIComponent(event.title);
    let date = encodeURIComponent(event.date);
    return `/?desc=${desc}&title=${title}&date=${date}#/notification/`;
  }

  render() {
    return (
      <div>
        <Notifications />
      </div>
    );
  }
}
