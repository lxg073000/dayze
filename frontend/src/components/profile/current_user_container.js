import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import Hub from "./user_calendar_hub";

const mapStateToProps = (state) => {
  debugger;
  return {
    events: Object.values(state.events.user),
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hub);
