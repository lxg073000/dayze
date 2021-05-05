import { connect } from "react-redux";
import {
  receiveEventTimerBatch,
  receiveEventTimerData,
  removeEventTimer,
} from "../../actions/event_timer_actions";
import { filterEventsByTime, filterEventByTime } from "../../util/filters";
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
    filteredNewUpdatedEvents: [
      filterEventByTime(30, state.eventTimers.updatedEvent), 
      filterEventByTime(15, state.eventTimers.updatedEvent),
      filterEventByTime(30, state.eventTimers.newEvent), 
      filterEventByTime(15, state.eventTimers.newEvent)
    ]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshEventTimers: (eventTimers) =>
      dispatch(receiveEventTimerBatch(eventTimers)),
    createEventTimers: (eventTimer) =>
      dispatch(receiveEventTimerData(eventTimer)),
    removeEventTimer: (eventTimerId) =>
      dispatch(removeEventTimer(eventTimerId)),
    // updateTimeout: (myTimeoutID, event) => dispatch(updateTimeout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(timer);
