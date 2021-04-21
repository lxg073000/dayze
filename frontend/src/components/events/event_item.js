import React from "react";
import EventEditor from "./event_editor_container";

class EventItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      evntTitle: "",
      evntDate: "",
      evntTime: "",
      evntDesc: "",
      editor_form: false,
    };
    this.edit_btn = this.edit_btn.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchEvent(this.props.currentUser.id);
  //   this.setState({ events: this.props.events });
  //   debugger;
  // }

  edit_btn() {
    debugger;
    this.setState({ editor_form: !this.state.editor_form });
  }
  delete_btn(e, id) {
    debugger;
    this.props.handleDelete(id);
    this.setState({ editor_form: !this.state.editor_form });
  }
  render() {
    debugger;
    return (
      <ul id={this.props.id} className="event-card">
        {this.state.editor_form ? (
          <EventEditor
            id={this.props.id}
            evntTitle={this.props.title}
            evntDate={new Date(this.props.date).toISOString().substr(0, 10)}
            evntTime={new Date(this.props.date).toTimeString().slice(0, 8)}
            evntDesc={this.props.description}
            currentUser={this.props.currentUser}
            handleUpdate={this.props.handleUpdate}
            closeEdit={this.edit_btn}
          />
        ) : null}
        <li key={`${this.props.id}-title`}>
          {this.props.title}
          <span className="event-tools">
            <i
              onClick={(e) => this.edit_btn(e, this.props.id)}
              className="fas fa-edit"
            ></i>
            <i
              onClick={(e) => this.delete_btn(e, this.props.id)}
              className="far fa-calendar-times"
            ></i>
          </span>
        </li>
        <li key={`${this.props.id}-desc`}>{this.props.description}</li>
        <li key={`${this.props.id}-date`}>
          {`${new Date(this.props.date).toDateString()} at ${new Date(
            this.props.date
          ).toLocaleTimeString()}`}
        </li>
        <div key={`${this.props.id}-lb`} className="linebreak"></div>
      </ul>
    );
  }
}

export default EventItem;
