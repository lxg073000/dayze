import { connect } from "react-redux";
import {
  fetchUserEvents,
  fetchEvent,
  deleteEvent,
  // updateEvent,
  fetchTodays,
} from "../../actions/event_actions";
import EventEditor from "./event_editor";

const mapStateToProps = (state) => {
  // debugger;
  return {
    event: Object.values(state.events.event_item),
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserEvents: (user) => dispatch(fetchUserEvents(user)),
    fetchTodays: () => dispatch(fetchTodays()),
    fetchEvent: (id) => dispatch(fetchEvent(id)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
    // updateEvent: (id, data) => dispatch(updateEvent(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);
