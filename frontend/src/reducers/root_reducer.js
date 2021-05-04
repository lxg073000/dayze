import { combineReducers } from "redux";
import session from "./session_api_reducer";
import friends from "./friends_reducer";
import errors from "./errors_reducer";
import events from "./events_reducer";
import eventTimers from "./event_timers_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  eventTimers,
  events,
  friends,
});

export default RootReducer;
