import { connect } from "react-redux";
// import { getCalendar } from "../../actions/calendar";
import Calendar from "./calendar";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCalendar: (calenderID) => dispatch(getCalendar(calenderID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
