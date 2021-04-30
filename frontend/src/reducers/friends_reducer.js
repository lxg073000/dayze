import {
  RECEIVE_FRIEND,
  RECEIVE_FRIENDS,
  RECEIVE_USERS,
  REMOVE_FRIEND,
} from "../actions/friends_actions";

const initialState = {
  users: [],
  friends: [],
};

const friendsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_FRIEND:
      newState.friends.push(action.friend);
      return newState;
    case RECEIVE_FRIENDS:
      debugger;
      newState.friends = action.friends;
      return newState;
    case RECEIVE_USERS:
      debugger;
      newState.users = action.users;
      return newState;
    case REMOVE_FRIEND:
      debugger;
      newState.friends = newState.friends.filter(
        (friend) => !friend.id === action.friendID
      );
      return newState;
    default:
      return state;
  }
};

export default friendsReducer;
