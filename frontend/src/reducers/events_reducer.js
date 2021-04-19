import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  RECEIVE_USER_EVENTS,
  RECEIVE_NEW_EVENT,
  RECEIVE_UPDATE_EVENT,
  RECEIVE_DELETE_EVENT,
} from "../actions/event_actions";

const EventsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  //debugger;
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      newState.all = action.events.data;
      return newState;
    case RECEIVE_USER_EVENTS:
      newState.user = action.events.data;
      return newState;
    case RECEIVE_NEW_EVENT:
      newState.new = action.event.data;
      newState.user.push(newState.new);
      return newState;
      debugger;
    default:
      return state;
  }
};

export default EventsReducer;
