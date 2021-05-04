import { connect } from "react-redux";
import {
  fetchUserEvents,
  createEvent,
  updateEvent,
} from "../../actions/event_actions";
import {
  logout,
  guestLogin,
  receiveIsLinkedGoogleAccount,
  removeGoogleLink,
} from "../../actions/session_actions";
import Hub from "./user_calendar_hub";
import { filterEventsByTime } from "../../util/filters";

const mapStateToProps = (state) => {
  //debugger;
  return {
    events: Object.values(state.events.user),
    currentUser: state.session.user,
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    eventsByHalfHour: filterEventsByTime(30, Object.values(state.events.user)),
    eventsByHour: filterEventsByTime(60, Object.values(state.events.user)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchUserEvents: (id) => dispatch(fetchUserEvents(id)),
    guestLogin: () => dispatch(guestLogin()),
    createEvent: (data) => dispatch(createEvent(data)),
    updateEvent: (id, data) => dispatch(updateEvent(id, data)),
    changeIsLinkedGoogleAccount: (bool) =>
      dispatch(receiveIsLinkedGoogleAccount(bool)),
    removeGoogleLink: () => dispatch(removeGoogleLink()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hub);
