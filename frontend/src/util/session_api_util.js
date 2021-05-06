import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export const updateOAuthTokens = (user, tokens) => {
  return axios.patch(`/api/users/${user.id}/googleAuth`, tokens);
};

export const signup = (userData) => {
  return axios.post("/api/users/register", userData);
};

export const login = (userData) => {
  return axios.post("/api/users/login", userData);
};
export const guestUser = (userData) => {
  return axios.post("/api/users/register", userData);
};

export const removeAuthAndID = () => {
  return axios.delete("/api/currentUserIds/");
};

export const linkGoogleCal = () => {
  return axios.get("api/users/LinkToGoogleCal");
};
