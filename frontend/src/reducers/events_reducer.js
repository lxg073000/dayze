import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  RECEIVE_USER_EVENTS,
  RECEIVE_NEW_EVENT,
  RECEIVE_UPDATE_EVENT,
  RECEIVE_DELETE_EVENT,
  RECEIVE_GUEST_EVENTS
} from "../actions/event_actions";

const EventsReducer = (
  state = { all: {}, user: [], new: undefined, event_item: {} },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      newState.user = action.events.data;
      return newState;
    case RECEIVE_GUEST_EVENTS:
      newState.user = action.events;
      return newState;
    case RECEIVE_EVENT:
      newState.event_item = action.event.data;
      return newState;
    case RECEIVE_USER_EVENTS:
      newState.user = action.events.data;
      return newState;
    case RECEIVE_NEW_EVENT:
      newState.new = action.event.data;
      // newState.user.push(newState.new);
      return newState;
    case RECEIVE_UPDATE_EVENT:
      newState.user = state.user.map((ele) => {
        if (ele._id === action.event.data._id) {
          return action.event.data;
        } else {
          return ele;
        }
      });
      return newState;
    case RECEIVE_DELETE_EVENT:
      newState.user = state.user.filter(
        (ele) => ele._id !== action.event.data._id
      );
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
