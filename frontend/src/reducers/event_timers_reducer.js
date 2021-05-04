import {
  RECEIVE_EVENT_TIMER_BATCH,
  RECEIVE_EVENT_TIMER_DATA,
  REMOVE_EVENT_TIMER,
} from "../actions/event_timer_actions";

const EventTimersReducer = (state = { eventIds: {} }, action) => {
  //debugger;
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_EVENT_TIMER_BATCH:
      newState.eventIds = action.eventTimerBatch;
      return newState;
    case RECEIVE_EVENT_TIMER_DATA:
      newState.eventIds = Object.assign(
        newState.eventIds,
        action.eventTimerData
      );
      return newState;
    case REMOVE_EVENT_TIMER:
      // debugger;
      delete newState.eventIds[action.eventId];
      return newState;
    default:
      return state;
  }
};

export default EventTimersReducer;
