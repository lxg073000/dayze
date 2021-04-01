import React, { Component } from "react";
import DailyCard from "../../components/events/daily_card";
export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dayCard: false,
      eventForm: false,
    };
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.baseCal = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.active = {
      date: null,
    };
    this.toggleDayCard = this.toggleDayCard.bind(this);
  }

  // takes a Date Object and returns the full day of the week
  getDayFull(date) {
    return this.baseCal[date.getDate()];
  }

  // takes a Date Object and returns the abreviated day of the week
  getDayAbrv(dateObject) {
    return dateObject.toDateString().split(" ")[0];
  }

  // takes a Date Object and returns the 3-letter abreviated month
  getMonthAbrv(dateObject) {
    return dateObject.toDateString().split(" ")[1];
  }

  // takes a Date Object and returns the base 10 date, padded with a 0
  getDatePadded(dateObject) {
    return dateObject.toDateString().split(" ")[2];
  }

  componentDidMount() {
    this.showCalendar(this.state.date);
  }

  showCalendar(dateObject) {
    debugger;
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const date = new Date(year, month, 1);
    debugger;
    const fullCalDays = [];

    this.baseCal.forEach((day, id) =>
      fullCalDays.push(
        <div className="cal-day-full" key={`cal${id}`}>
          {day}
        </div>
      )
    );

    while (date.getMonth() === month) {
      fullCalDays.push(
        <div
          key={date.getDate()}
          onClick={(e) => this.setActiveDate(e)}
          className={`d${date.getDay()} date ${
            this.active.date
          }-${date.getDay()}`}
        >
          {date.getDate()}
        </div>
      );
      date.setDate(date.getDate() + 1);
    }
    return fullCalDays.map((date) => date);
  }

  incrimentMonth() {
    const oldDate = this.state.date;
    oldDate.setMonth(this.state.date.getMonth() + 1);
    const newDate = oldDate;
    this.setState({
      date: newDate,
    });
  }
  decrimentMonth() {
    const oldDate = this.state.date;
    oldDate.setMonth(this.state.date.getMonth() - 1);
    const newDate = oldDate;
    this.setState({
      date: newDate,
    });
  }

  setActiveDate(e) {
    debugger;
    this.active["date"] = e.currentTarget.innerHTML;
    this.toggleDayCard();
  }

  toggleDayCard = () => {
    this.setState({
      dayCard: !this.state.dayCard,
    });
  };
  toggleEventCard = () => {
    this.setState({
      eventForm: !this.state.eventForm,
    });
  };

  render() {
    return (
      <div>
        <div className="widget-box-full">
          <div className="cal-toggle">
            <p>{`${
              this.months[this.state.date.getMonth()]
            } ${this.state.date.getFullYear()}`}</p>

            <span>
              <button className="sample-btn" onClick={this.toggleEventCard}>
                Create Event
              </button>
              <i
                className="fas fa-chevron-left"
                onClick={() => this.decrimentMonth()}
              ></i>
              <i
                className="fas fa-chevron-right"
                onClick={() => this.incrimentMonth()}
              ></i>
            </span>
          </div>
          <div className="calendar">{this.showCalendar(this.state.date)}</div>
          <div className={this.state.dayCard ? "show" : "hide"}>
            <DailyCard
              activeDate={this.active.date}
              toggle={this.toggleDayCard}
            />
          </div>
        </div>
      </div>
    );
  }
}
