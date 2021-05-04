import { connect } from "react-redux";
import { guestLogin } from "../../actions/session_actions";
import Notifications from "./notifications";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    guestLogin: () => dispatch(guestLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
