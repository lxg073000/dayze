import React from "react";
import Calendar from "../calendar/calendar_container";
import Events from "../events/events_container";
import LinkedInList from "../nav/linked_in_list";
import GoogleUrl from "../session/google_url_container";
import EventTimers from "../timer/event_timer_container";

export default class user_calender_hub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedIn: true,
      switched: false,
      notifications: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleLinkedIn = this.toggleLinkedIn.bind(this);
    this.toggleSwitched = this.toggleSwitched.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
    this.handleNotifications = this.handleNotifications.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //submission { dispatch, setState(switched value)}
  toggleSwitched() {
    this.setState({ switched: false });
  }
  handleNewEvent(data) {
    this.props.createEvent(data);
    this.setState({ switched: true });
  }
  handleUpdateEvent(id, data) {
    this.props.updateEvent(id, data);
    this.setState({ switched: true });
  }

  componentDidMount() {
    if (this.props.currentUser.isFirstGuestSignIn){
      this.props.createGuestEvents(this.props.currentUser.id);
      this.props.currentUser.isFirstGuestSignIn = false;
    }else{
      this.props.fetchUserEvents(this.props.currentUser.id);
    }

    if (this.props.location.pathname.includes("granted")) {
      this.props.changeIsLinkedGoogleAccount(true);
    }
  }

  componentWillUnmount() {
    // document.getElementById("root").style.opacity = "0";
    // document.getElementById("root").style.height = "100vh";
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

  toggleLinkedIn() {
    document.getElementById("linkedIn-btn").classList.toggle("activated");
    document.getElementById("linkedIn").classList.toggle("hide");

    this.setState({
      linkedIn: !this.state.linkedIn,
    });
  }

  createNotifications(filteredEvents) {
    filteredEvents.forEach((ev) => {
      let currentTime = new Date();
      let timeUntil = ev.notificationTime - currentTime;
      setTimeout(this.handleNotifications(), timeUntil);
    });
  }
  closeModal() {
    this.props.removeGoogleLink();
  }
  handleNotifications() {}

  render() {
    return (
      <div className="user-shell">
        <EventTimers />
        {/* {ReactDOM.createPortal(<p>Hello! what's up?</p>, document.getElementById("root"))} */}
        {this.props.currentUser.googleUrl &&
        !this.props.location.pathname.includes("granted") ? (
          <GoogleUrl closeModal={this.closeModal} />
        ) : null}
        <img
          alt="bg-img"
          className="background-img1 hub-dark main-bg1"
          src="/assets/mainbg.jpg"
        ></img>
        <div className="hub-content-grid">
          <div className="white"></div>
          <div className="main">
            <div className="hub-container">
              <div className="hsec head">
                <p className="main-headline">
                  Dayze {/*  {`${this.props.username}`} */}
                </p>
              </div>
              <div className='hub-instructions'>
                <span>View or edit your events and have them sorted by day or month</span>
                <span>Click on your desired day on the calendar to create a new event or click the link icon to link your google account</span>
              </div>
              <div className="hsec event-creator show-event">
                <div className="title">
                  <p className="event-headline">Schedule a reminder</p>
                </div>
              </div>
              <div className="hsec cal-container container">
                <Calendar createEvent={this.handleNewEvent} />
                <div className="cal-sec half-card top-events">
                  <ul></ul>

                  <div>
                    <Events
                      toggleSwitched={this.toggleSwitched}
                      switched={this.state.switched}
                      updateEvent={this.handleUpdateEvent}
                      userEvents={this.props.events}
                    />
                  </div>
                </div>
              </div>
              <div className="hsec hub-footer">
                <ul className="hub-navs flex-end">
                  <li onClick={this.handleClick}>Log Out</li>
                  <span className="contacts">
                    <a
                      rel="noreferrer"
                      target="_blank"
                      title="Dayze Github"
                      alt="Dayze Github"
                      href="https://github.com/lxg073000/dayze/wiki"
                    >
                      <i className="fab fa-github"></i>
                    </a>

                    <i
                      id="linkedIn-btn"
                      onClick={this.toggleLinkedIn}
                      className="fab fa-linkedin"
                      title="Dayze Developers"
                      alt="Dayze Developers"
                    >
                      <LinkedInList className="hide" />
                    </i>
                  </span>
                </ul>
              </div>
            </div>
          </div>

          <div className="white"></div>
        </div>
      </div>
    );
  }
}
