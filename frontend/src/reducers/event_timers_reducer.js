import {
  RECEIVE_EVENT_TIMER_BATCH,
  RECEIVE_EVENT_TIMER_DATA,
  REMOVE_EVENT_TIMER,
} from "../actions/event_timer_actions";

import {
  RECEIVE_NEW_EVENT,
  RECEIVE_UPDATE_EVENT,
  RECEIVE_DELETE_EVENT 
} from "../actions/event_actions";

import {RECEIVE_USER_LOGOUT} from '../actions/session_actions';

let initialState= { eventIds: {}, updatedEvent:{}, newEvent:{}};
const EventTimersReducer = (state = initialState, action) => {
  //debugger;
  Object.freeze(state);
  let newState = Object.assign({}, state, {updatedEvent:{}, newEvent:{}} );
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
      delete newState.eventIds[action.eventId];
      return newState;
    case RECEIVE_DELETE_EVENT:
      newState.eventIds[action.event.data._id].forEach(id=>clearTimeout(id));
      delete newState.eventIds[action.event.data._id];
      return newState;
    case RECEIVE_UPDATE_EVENT:
      newState.updatedEvent = action.event.data;
      debugger
      let idList = newState.eventIds[action.event.data._id]
      if (idList) idList.forEach(id=>clearTimeout(id));
      delete newState.eventIds[action.event.data._id];
      return newState;
    case RECEIVE_NEW_EVENT:
      newState.newEvent = action.event.data;
      return newState;        
    case RECEIVE_USER_LOGOUT:
      Object.values(newState.eventIds).forEach(timeoutIdList=>{
        timeoutIdList.forEach(toid =>{
          clearTimeout(toid);
        })
      });
      return initialState;
    default:
      return state;
  }
};

export default EventTimersReducer;
