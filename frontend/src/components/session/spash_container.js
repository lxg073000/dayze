import { connect } from "react-redux";
import { guestRegister } from "../../actions/session_actions";
import Splash from "./splash";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    signedIn: state.session.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    guestRegister: () => dispatch(guestRegister()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
