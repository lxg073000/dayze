import {
    RECEIVE_EVENTS,
    RECEIVE_EVENT,
    RECEIVE_USER_EVENTS,
    RECEIVE_NEW_EVENT,
    RECEIVE_UPDATE_EVENT,
    RECEIVE_DELETE_EVENT
} from '../actions/event_actions'

const EventsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        
    }
}