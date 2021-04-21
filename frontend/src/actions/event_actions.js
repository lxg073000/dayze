import * as APIUtil from "../util/event_api_util";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_USER_EVENTS = "RECEIVE_USER_EVENTS";
export const RECEIVE_NEW_EVENT = "RECEIVE_NEW_EVENT";
export const RECEIVE_UPDATE_EVENT = "RECEIVE_UPDATE_EVENT";
export const RECEIVE_DELETE_EVENT = "RECEIVE_DELETE_EVENT";

export const receiveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  events,
});

export const receiveEvent = (event) => {
  debugger;
  return {
    type: RECEIVE_EVENT,
    event,
  };
};

export const receiveUserEvents = (events) => ({
  type: RECEIVE_USER_EVENTS,
  events,
});

export const receiveNewEvent = (event) => ({
  type: RECEIVE_NEW_EVENT,
  event,
});

export const receiveUpdateEvent = (event) => ({
  type: RECEIVE_UPDATE_EVENT,
  event,
});

export const receiveDeleteEvent = (event) => ({
  type: RECEIVE_DELETE_EVENT,
  event,
});

export const fetchEvents = () => (dispatch) =>
  APIUtil.getEvents()
    .then((events) => dispatch(receiveEvents(events)))
    .catch((err) => console.log(err));

export const fetchEvent = (id) => (dispatch) =>
  APIUtil.getEvent(id)
    .then((event) => dispatch(receiveEvent(event)))
    .catch((err) => console.log(err));

export const fetchTodays = () => (dispatch) =>
  APIUtil.getToday()
    .then((events) => dispatch(receiveEvents(events)))
    .catch((err) => console.log(err));

export const fetchWeek = () => (dispatch) =>
  APIUtil.getWeek()
    .then((events) => dispatch(receiveEvents(events)))
    .catch((err) => console.log(err));

export const fetchUserEvents = (id) => (dispatch) =>
  APIUtil.getUserEvents(id)
    .then((events) => dispatch(receiveUserEvents(events)))
    .catch((err) => console.log(err));

export const createEvent = (data) => (dispatch) =>
  APIUtil.createEvent(data)
    .then((event) => {
      debugger;
      return dispatch(receiveNewEvent(event));
    })
    .catch((err) => console.log(err));

export const updateEvent = (id, data) => async (dispatch) =>
  APIUtil.updateEvent(id, data)
    .then((event) => {
      debugger;
      return dispatch(receiveUpdateEvent(event));
    })
    .catch((err) => console.log(err));

export const deleteEvent = (id) => (dispatch) =>
  APIUtil.deleteEvent(id)
    .then((event) => {
      debugger;
      return dispatch(receiveDeleteEvent(event));
    })
    .catch((err) => console.log(err));
