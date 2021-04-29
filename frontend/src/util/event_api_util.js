import axios from "axios";
axios.baseURL = "http://localhost:5000";

export const getEvents = () => {
  return axios.get("/api/events");
};

export const getEvent = (id) => {
  return axios.get(`/api/events/${id}`);
};

export const getToday = (id) => {
  return axios.get(`/api/events/today/${id}`);
};
export const getWeek = (id) => {
  return axios.get(`/api/events/week/${id}`);
};
export const getMonth = (id) => {
  return axios.get(`/api/events/month/${id}`);
};

export const getUserEvents = (id) => {
  return axios.get(`/api/events/user/${id}`);
};

export const createEvent = (data) => {
  return axios.post("/api/events/", data);
};

export const updateEvent = (id, data) => {
  //debugger;
  return axios.patch(`/api/events/${id}`, data);
};

export const deleteEvent = (id, isLinkedGoogleAccount) => {
  //debugger;
  return axios.delete(`/api/events/${id}`, isLinkedGoogleAccount);
};
