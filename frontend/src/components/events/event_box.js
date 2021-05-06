import React from "react";
import EventEditor from "./event_editor";

class EventBox extends React.Component {
  edit_btn(e, id) {
    // let event_patch_id = `${e.target.parentElement.parentElement.parentElement.id}-patch`;
    // console.log(e.target.parentElement.parentElement.parentElement.children);
    let selected_event = document.getElementById(`${id}-patch`);

    selected_event.classList.toggle("hide");
  }
  delete_btn(e) {
    this.props.handleDelete(
      e.target.parentElement.parentElement.parentElement.id
    );
  }
  render() {
    return (
      <ul id={this.props.id} className="event-card">
        <EventEditor
          id={this.props.id}
          evntTitle={this.props.title}
          evntDate={this.props.date}
          evntTime={this.props.time}
          evntDesc={this.props.description}
          currentUser={this.props.currentUser}
          handleUpdate={this.props.handleUpdate}
        />
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

export default EventBox;
