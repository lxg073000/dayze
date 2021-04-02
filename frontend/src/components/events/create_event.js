import React from "react";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      date: "",
      time: "",
      newEvent: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ newEvent: nextProps.newEvent });
  }

  composeDate(date, time) {
    return new Date(date + " " + time);
  }

  handleSubmit(e) {
    e.preventDefault();
    let event = {
      title: this.state.title,
      description: this.state.description,
      date: this.composeDate(this.state.date, this.state.time),
    };

    this.props.createEvent(event);
    this.setState({
      title: "",
      description: "",
      date: "",
      time: "",
    });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  render() {
    return (
      <div className="widget-box-wide">
        <form className="create-event" onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.update("title")}
            placeholder="Event title"
          />
          <label>Description</label>
          <input
            rows="2"
            cols="200"
            type="textarea"
            value={this.state.description}
            onChange={this.update("description")}
            placeholder="Event description"
          />
          <label>Date</label>
          <input
            type="date"
            value={this.state.date}
            onChange={this.update("date")}
            placeholder="Event date"
          />
          <label>Time</label>
          <input
            type="time"
            value={this.state.time}
            onChange={this.update("time")}
            placeholder="Event time"
          />
          <input className="sample-btn" type="submit " value="Create Event" />
        </form>
      </div>
    );
  }
}

export default CreateEvent;
