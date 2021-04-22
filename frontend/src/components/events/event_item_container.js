import { connect } from "react-redux";
import {
  fetchUserEvents,
  deleteEvent,
  updateEvent,
  fetchTodays,
  fetchEvent,
} from "../../actions/event_actions";
import EventItem from "./event_item";

const mapStateToProps = (state) => {
  // debugger;
  return {
    events: Object.values(state.events.user),
    item: state.events.item,
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserEvents: (user) => dispatch(fetchUserEvents(user)),
    fetchEvent: (id) => dispatch(fetchEvent(id)),
    fetchTodays: () => dispatch(fetchTodays()),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
    updateEvent: (id, data) => dispatch(updateEvent(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventItem);
