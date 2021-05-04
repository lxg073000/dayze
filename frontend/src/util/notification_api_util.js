import axios from "axios";

export const openNotification = (event) => {
  return axios.post("/api/notifications", event);
};
