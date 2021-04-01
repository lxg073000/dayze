import { connect } from "react-redux";
import Calendar from "./calendar";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
