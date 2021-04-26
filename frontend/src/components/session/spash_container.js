import { connect } from "react-redux";
import { guestLogin } from "../../actions/session_actions";
import Splash from "./splash";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    signedIn: state.session.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    guestLogin: () => dispatch(guestLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
