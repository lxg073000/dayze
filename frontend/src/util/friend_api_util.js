import axios from "axios";

//shows all users
export const getUsers = () => {
  return axios.get("/api/users/");
};

//shows all friends of a particular user
export const getUsersFriends = (id) => {
  return axios.get(`/api/friends/userId/${id}`);
};

//shows a particular user
export const getFriend = (id) => {
  return axios.get(`/api/friends/${id}`);
};

//create friend association
export const postFriend = (id) => {
  return axios.post(`/api/friends/${id}`);
};

//delete friend association
export const deleteFriend = (id) => {
  return axios.post(`/api/friends/${id}`);
};

export const test = () => {
  return axios.get("/api/friends/test");
};
