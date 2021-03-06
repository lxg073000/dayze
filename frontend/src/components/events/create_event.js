import React from "react";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      date: this.props.activeDateVal,
      time: "",
      newEvent: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      date: this.props.activeDateVal,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ newEvent: nextProps.newEvent });
  }

  composeDate(date, time) {
    return new Date(date + " " + time);
  }

  handleSubmit(e) {
    e.preventDefault();
    let event = {
      title: this.state.title,
      description: this.state.description || "Plans for the day",
      date: this.composeDate(this.state.date, this.state.time),
      user: this.props.currentUser,
    };

    this.props.createEvent(event);
    this.setState({
      title: "",
      description: "",
      date: "",
      time: "",
    });
    this.props.close();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
        date: this.props.activeDateVal,
      });
  }

  render() {
    return (
      <div className="widget-box-wide">
        <form className="create-event" onSubmit={this.handleSubmit}>
          <label className="form-item">Title</label>
          <input
            className="form-item"
            type="text"
            value={this.state.title}
            onChange={this.update("title")}
            placeholder="Event title"
          />
          <label className="form-item">Description</label>
          <input
            id="styled"
            className="form-item"
            type="textarea"
            value={this.state.description}
            onChange={this.update("description")}
            placeholder="Event description"
          />
          <label className="form-item">Date</label>
          <input
            className="form-item"
            type="date"
            // value={this.props.activeDateVal}
            // onChange={this.update("date")}
            placeholder="Event date"
          />
          <label className="form-item">Time</label>
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
            value="Create Event"
          />
        </form>
      </div>
    );
  }
}

export default CreateEvent;
