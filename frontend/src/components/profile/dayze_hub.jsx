import React, { Component } from "react";
import Calendar from "../calendar/calendar";
import EventList from "../events/event_showcard";
import CreateEvent from "../events/create_event_container";

export default class dayze_hub extends Component {
  render() {
    return (
      <div className="main">
        <div className="main-blur">
          <div className="background"></div>
        </div>
        <div className="head">
          <p className="main-headline">Upcoming Events</p>
        </div>
        <div className="container">
          <Calendar />
          <div className="half-card top-events">
            <ul></ul>

            <div>
              <EventList />
            </div>
          </div>
          <div className="half-card show-event">
            <div className="title">
              <p className="event-headline">Navigation Bar</p>
              <CreateEvent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}