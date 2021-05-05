import { connect } from "react-redux";
import {
  fetchUserEvents,
  deleteEvent,
  fetchTodays,
  fetchWeek,
  fetchMonth,
} from "../../actions/event_actions";
import { linkGoogleCal } from "../../actions/session_actions";
import Events from "./events";

const mapStateToProps = (state) => {
  return {
    events: Object.values(state.events.user),
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserEvents: (user) => dispatch(fetchUserEvents(user)),
    fetchTodays: (id) => dispatch(fetchTodays(id)),
    fetchWeek: (id) => dispatch(fetchWeek(id)),
    fetchMonth: (id) => dispatch(fetchMonth(id)),
    deleteEvent: (id, data) => dispatch(deleteEvent(id, data)),
    linkGoogleCal: () => dispatch(linkGoogleCal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
