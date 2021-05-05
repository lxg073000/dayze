import React from "react";
import Notifications from "../notifications/notification";

export default class EventTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.eventsInHalfHour
    };
    this.handleEventTimer = this.handleEventTimer.bind(this);
    this.timeUntil = this.timeUntil.bind(this);
    this.createQueryString = this.createQueryString.bind(this);
    this.manageEventTimers = this.manageEventTimers.bind(this);
  }

  componentDidMount() {
    //get all filtered upcoming events
    this.initialSetTimeout = setTimeout(this.manageEventTimers, 5000);
    this.setIntervalId = setInterval(this.manageEventTimers, 30*60000)

    // this.props.eventsByHalfHour.forEach((event) => {
    //   this.handleEventTimer(event);
    // });

    // this.props.eventsByHour.forEach((event) => {
    //   this.handleEventTimer(event);
    // });
  }


  manageEventTimers(){

    //clear the event timeouts
    for (const [eventId, timeoutIdList] of Object.entries(this.props.eventTimers.eventIds)){
      timeoutIdList.forEach(toid =>{
        clearTimeout(toid);
      })
    }

    //create new event timeouts
    let eventReminders = {};
    let eventList = this.props.eventsInHalfHour.concat(
      this.props.eventsInQuarterHour
    );

    eventList.forEach((event) => {
      if (eventReminders[event._id]) {
        eventReminders[event._id].push(this.handleEventTimer(event));
      }else{
        eventReminders[event._id] = [this.handleEventTimer(event)];
      }
    });

    this.props.refreshEventTimers(eventReminders);
  }  


  componentDidUpdate(prevProps, prevState, snapshot){
    let newUpdatedReminders = {};
    let isShouldUpdate = false;
    this.props.filteredNewUpdatedEvents.forEach(ev=>{
      if (ev){
        if (newUpdatedReminders[ev._id]) {
          newUpdatedReminders[ev._id].push(this.handleEventTimer(ev));
        }else{
          newUpdatedReminders[ev._id] = [this.handleEventTimer(ev)];
        }
        isShouldUpdate = true;
      }
    })
    if (isShouldUpdate)  this.props.createEventTimers(newUpdatedReminders);
  }

  componentWillUnmount(){
    clearTimeout(this.initialSetTimeout);
    clearInterval(this.setIntervalId);
  }


  handleEventTimer(event) {
    let eventTimeoutID = setTimeout(() => {
      window.open(`http://dayze.herokuapp.com${this.createQueryString(event)}`);
    }, this.timeUntil(event));

    return eventTimeoutID;
  }

  timeUntil(event) {
    let currentTime = new Date();
    let timeUntilE = event.notificationTime - currentTime;
    return timeUntilE;
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
        <Notifications 
          events = {this.props.eventsInQuarterHour}
        />
      </div>
    );
  }
}
