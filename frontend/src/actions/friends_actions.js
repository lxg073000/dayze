import * as APIUtil from "../util/friend_api_util";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const REMOVE_FRIEND = "REMOVE_FRIEND";

export const receiveFriend = (friend) => ({
  type: RECEIVE_FRIEND,
  friend,
});

export const receiveFriends = (friends) => {
  // debugger;
  return {
    type: RECEIVE_FRIENDS,
    friends,
  };
};
export const receiveUsers = (users) => {
  // debugger;
  return {
    type: RECEIVE_USERS,
    users,
  };
};
export const removeFriend = (friendID) => {
  // debugger;
  return {
    type: REMOVE_FRIEND,
    friendID,
  };
};

//for searching DB for a friend
export const fetchUsers = () => (dispatch) =>
  APIUtil.getUsers()
    .then((events) => dispatch(receiveUsers(events)))
    .catch((err) => console.log(err));

//fetch a particular friend
export const fetchFriend = () => (dispatch) =>
  APIUtil.getFriend()
    .then((events) => dispatch(receiveFriend(events)))
    .catch((err) => console.log(err));

//fetch all friends of a particular user
export const fetchFriends = (id) => (dispatch) =>
  APIUtil.getUsersFriends(id)
    .then((event) => dispatch(receiveFriends(event)))
    .catch((err) => console.log(err));

//post friend's ID to currentUsers friend model
export const addFriend = (id) => (dispatch) =>
  APIUtil.postFriend(id)
    .then((event) => dispatch(receiveFriend(event)))
    .catch((err) => console.log(err));

//delete friend from currentUsers friend model
export const deleteFriend = (id) => (dispatch) =>
  APIUtil.deleteFriend(id)
    .then((event) => dispatch(removeFriend(event)))
    .catch((err) => console.log(err));
