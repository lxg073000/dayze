import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export const updateOAuthTokens = (user, tokens) => {
  ////debugger;
  return axios.patch(`/api/users/${user.id}/googleAuth`, tokens);
};

export const signup = (userData) => {
  ////debugger;
  return axios.post("/api/users/register", userData);
};

export const login = (userData) => {
  ////debugger;
  return axios.post("/api/users/login", userData);
};
export const guestUser = (userData) => {
  ////debugger;
  return axios.post("/api/users/login", userData);
};
