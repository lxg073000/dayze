import { connect } from "react-redux";
import {
  receiveEventTimerBatch,
  receiveEventTimerData,
  removeEventTimer,
} from "../../actions/event_timer_actions";
import { filterEventsByTime } from "../../util/filters";
import timer from "./event_timer";

const mapStateToProps = (state) => {
  debugger
  return {
    eventTimers: state.eventTimers,
    eventsInHalfHour: filterEventsByTime(30, state.events.user),
    eventsInQuarterHour: filterEventsByTime(
      15,
      state.events.user
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEventTimers: (eventTimers) =>
      dispatch(receiveEventTimerBatch(eventTimers)),
    createEventTimer: (eventTimer) =>
      dispatch(receiveEventTimerData(eventTimer)),
    removeEventTimer: (eventTimerId) =>
      dispatch(removeEventTimer(eventTimerId)),
    // updateTimeout: (myTimeoutID, event) => dispatch(updateTimeout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(timer);
