import React, { Component } from "react";
import { Link } from "react-router-dom";
import Calendar from "../calendar/calendar_container";
import CreateEvent from "../events/create_event_container";
import Events from "../events/events_container";
import { logout } from "../../actions/session_actions";

export default class user_calender_hub extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === false) {
      this.props.history.push("/");
    }

    this.setState({ errors: nextProps.errors });
  }
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
              <p className="main-headline">
                Dazed {/*  {`${this.props.username}`} */}
              </p>
            </div>
            <div className="container">
              <Calendar />
              <div className="half-card top-events">
                <ul></ul>

                <div>
                  <Events />
                </div>
              </div>
              <div className="half-card show-event">
                <div className="title">
                  <p className="event-headline">Schedule a reminder</p>
                  <CreateEvent />
                </div>
              </div>
            </div>
            <div className="hub-footer">
              <ul className="splash-navs flex-end">
                <li>
                  <Link onClick={() => this.props.logout()}>Log Out</Link>
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
