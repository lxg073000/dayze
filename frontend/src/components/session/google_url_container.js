import { connect } from "react-redux";
import { withRouter } from "react-router";
import { updateOAuthTokens } from "../../actions/session_actions";
import GoogleUrl from "./google_url";

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoogleUrl));
