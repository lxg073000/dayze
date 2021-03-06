import axios from "axios";

axios.baseURL = "http://localhost:5000";

export const getEvents = () => {
  return axios.get("/api/events");
};

export const getEvent = (id) => {
  return axios.get(`/api/events/${id}`);
};

export const getUserEvents = (id) => {
  return axios.get(`/api/events/user/${id}`);
};

export const createEvent = (data) => {
  return axios.post("/api/events/", data);
};

export const updateEvent = (id, data) => {
  return axios.patch(`/api/events/${id}`, data);
};

export const deleteEvent = (id, isLinkedGoogleAccount) => {
  return axios.delete(`/api/events/${id}`, sadsfjapwofijaewf);
};
