import React, { Component } from "react";
import DayModal from "../../components/events/day_modal";
export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dayModal: false,
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
    this.baseCal = ["SUN", "MON", "TUES", "WED", "THR", "FRI", "SAT"];
    this.active = {
      date: this.state.date.getDate(),
      date_val: this.state.date.toISOString().substr(0, 10),
    };
    this.toggleDayModal = this.toggleDayModal.bind(this);
  }

  componentDidMount() {
    this.showCalendar(this.state.date);
  }

  showCalendar(dateObject) {
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const date = new Date(year, month, 1);
    const fullCalDays = [];

    // Embed Notification Container into cal-day-full div
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
          id={date.toISOString().substr(0, 10)}
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
    ////debugger;
    this.active["date"] = e.currentTarget.innerHTML;
    this.active["date_val"] = e.currentTarget.id;
    this.toggleDayModal();
  }

  toggleDayModal = () => {
    this.setState({
      dayModal: !this.state.dayModal,
    });
  };
  toggleEventCard = () => {
    this.setState({
      eventForm: !this.state.eventForm,
    });
  };

  render() {
    return (
      <div className="cal-componet">
        <div className="cal-widget">
          <div className="cal-toggle">
            <p>{`${
              this.months[this.state.date.getMonth()]
            } ${this.state.date.getFullYear()}`}</p>

            <span>
              <button
                className="sample-btn hide"
                onClick={this.toggleEventCard}
              >
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
          <div className={this.state.dayModal ? "show" : "hide"}>
            <DayModal
              activeDate={this.active.date}
              activeDateVal={this.active.date_val}
              toggle={this.toggleDayModal}
            />
          </div>
        </div>
      </div>
    );
  }
}
