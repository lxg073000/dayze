import { connect } from "react-redux";
import { updateOAuthTokens } from "../../actions/session_actions";
import Oauth from "./oauth";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOAuthTokens: (user, tokens) =>
      dispatch(updateOAuthTokens(user, tokens)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Oauth);
