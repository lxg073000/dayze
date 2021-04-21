import { connect } from "react-redux";
import {
  fetchUserEvents,
  deleteEvent,
  updateEvent,
} from "../../actions/event_actions";
import Events from "./events";

const mapStateToProps = (state) => {
  //debugger;
  return {
    events: Object.values(state.events.user),
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserEvents: (user) => dispatch(fetchUserEvents(user)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
    updateEvent: (id, data) => dispatch(updateEvent(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
