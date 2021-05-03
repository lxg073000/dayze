import { connect } from "react-redux";
import {
  fetchUserEvents,
  createEvent,
  updateEvent,
} from "../../actions/event_actions";
import { logout, guestLogin, receiveIsLinkedGoogleAccount} from "../../actions/session_actions";
import Hub from "./user_calendar_hub";

const mapStateToProps = (state) => {
  //debugger;
  return {
    events: Object.values(state.events.user),
    currentUser: state.session.user,
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchUserEvents: (id) => dispatch(fetchUserEvents(id)),
    guestLogin: () => dispatch(guestLogin()),
    createEvent: (data) => dispatch(createEvent(data)),
    updateEvent: (id, data) => dispatch(updateEvent(id, data)),
    changeIsLinkedGoogleAccount: (bool)=> dispatch(receiveIsLinkedGoogleAccount(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hub);
