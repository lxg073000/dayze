import React, { Component } from "react";
import { Link } from "react-router-dom";
import Calendar from "../calendar/calendar";
import EventList from "../events/event_showcard";
import CreateEvent from "../events/create_event_container";

export default class user_calender_hub extends Component {
  render() {
    return (
      <div className="shell">
        <div className="single-grid">
          <div className="white"></div>
          <div className="hub-letterbox"></div>
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
            <div className="hub-footer">
              <ul className="splash-navs flex-end">
                <li>
                  <Link to="/">Log Out</Link>
                </li>
                <span className="contacts">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://github.com/lxg073000/dayze/wiki"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.facebook.com/appacademyio"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </a>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/school/app-academy/"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </span>
              </ul>
            </div>
          </div>
          <div className="hub-letterbox"></div>
          <div className="white"></div>
        </div>
        <div className="grid-background"></div>
      </div>
    );
  }
}
