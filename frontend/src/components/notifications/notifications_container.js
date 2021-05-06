import { connect } from "react-redux";
import { guestRegister } from "../../actions/session_actions";
import Notifications from "./notifications";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    guestRegister: () => dispatch(guestRegister()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
