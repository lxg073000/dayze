import { connect } from "react-redux";
// import { createEvent } from "../../actions/event_actions";
import CreateEvent from "./create_event";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    events: Object.values(state.events.user),
    //newEvent: state.events.new
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // createEvent: (data) => dispatch(createEvent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
