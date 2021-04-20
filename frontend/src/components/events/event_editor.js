import React, { Component } from "react";

export default class event_editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.evntTitle,
      description: this.props.evntDesc,
      date: new Date(this.props.evntDate).toISOString().substr(0, 10),
      time: new Date(this.props.evntDate).toTimeString().slice(0, 8),
      newEvent: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  composeDate(date, time) {
    debugger;
    return new Date(date + " " + time);
  }

  handleSubmit(e) {
    debugger;
    e.preventDefault();
    let event = {
      title: this.state.title,
      description: this.state.description,
      date: this.composeDate(this.state.date, this.state.time),
      user: this.props.currentUser.id,
      _id: this.props.id,
    };

    let id = this.props.id;

    this.props.handleUpdate(id, event);
    // this.setState({
    //   title: "",
    //   description: "",
    //   date: "",
    //   time: "",
    // });
    debugger;
    document.getElementById(`${this.props.id}-patch`).classList.toggle("hide");
    // this.props.close();
  }

  render() {
    return (
      <div id={`${this.props.id}-patch`} className="hide event-editor">
        <form className="event-edit-form" onSubmit={this.handleSubmit}>
          <input
            className="form-item"
            type="text"
            value={this.state.title}
            onChange={this.update("title")}
            placeholder={this.props.evntTitle}
          />
          <input
            className="form-item"
            type="textarea"
            value={this.state.description}
            onChange={this.update("description")}
            placeholder={this.props.evntDesc}
          />
          <input
            className="form-item"
            type="date"
            value={this.state.date}
            onChange={this.update("date")}
            placeholder="Event date"
          />
          <input
            className="form-item"
            type="time"
            value={this.state.time}
            onChange={this.update("time")}
            placeholder="Event time"
          />
          <input
            className="sample-btn form-item"
            type="submit"
            value="Update Event"
          />
        </form>
      </div>
    );
  }
}
