import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import Hub from "./user_calendar_hub";

const mapStateToProps = (state) => {
  return {
    events: Object.values(state.events.all),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hub);
