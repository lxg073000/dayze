import { connect } from "react-redux";
import { signup, guestLogin } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    guestLogin: () => dispatch(guestLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
