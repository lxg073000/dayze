import { connect } from "react-redux";
import {
  receiveEventTimer,
  removeEventTimer,
} from "../../actions/event_timer_actions";
import timer from "./event_timer";

const mapStateToProps = (state) => {
  return {
    eventTimers: state.eventTimers,
    timerByHalfHour: state.events.filtered,
    timerByHour: state.events.filtered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEventTimer: (eventTimer) => dispatch(receiveEventTimer(eventTimer)),
    removeEventTimer: (eventTimerId) =>
      dispatch(removeEventTimer(eventTimerId)),
    // updateTimeout: (myTimeoutID, event) => dispatch(updateTimeout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(timer);
