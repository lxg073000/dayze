import { connect } from "react-redux";
import { guestRegister, login } from "../../actions/session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    signedIn: state.session.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    guestRegister: () => dispatch(guestRegister()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
