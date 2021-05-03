import { RECEIVE_EVENTS, RECEIVE_EVENT } from "../actions/event_actions";

const EventTimersReducer = (
  state = { all: {}, user: {}, new: undefined, event_item: {} },
  action
) => {
  //debugger;
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      newState.user = action.events.data;
      return newState;
    case RECEIVE_EVENT:
      // debugger;
      newState.event_item = action.event.data;
      return newState;
    default:
      return state;
  }
};

export default EventTimersReducer;
