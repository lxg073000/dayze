import React from "react";
import Calendar from "../calendar/calendar_container";
import Events from "../events/events_container";

export default class user_calender_hub extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserEvents(this.props.currentUser.id);
    debugger;
    // this.events = this.props.events;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === false) {
      this.props.history.push("/");
    }

    this.setState({ errors: nextProps.errors, events: nextProps.events });
  }

  handleClick() {
    this.props.logout();
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="shell">
        <img
          alt="bg-img"
          className="background-img1 hub-dark"
          src="https://images.unsplash.com/photo-1616361889157-7b095931aea5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ></img>
        <div className="hub-content-grid">
          <div className="white"></div>
          <div className="main">
            <div className="head">
              <p className="main-headline">
                Dazed {/*  {`${this.props.username}`} */}
              </p>
            </div>
            <div className="event-creator show-event">
              <div className="title">
                <p className="event-headline">Schedule a reminder</p>
              </div>
            </div>
            <div className="container">
              <Calendar />
              <div className="half-card top-events">
                <ul></ul>

                <div>
                  <Events userEvents={this.props.events} />
                </div>
              </div>
            </div>
            <div className="hub-footer">
              <ul className="hub-navs flex-end">
                <li>
                  <span onClick={this.handleClick}>Log Out</span>
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

          <div className="white"></div>
        </div>
      </div>
    );
  }
}
