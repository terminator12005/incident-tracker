import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/incidents";

export const fetchIncidents = (page = 0, size = 5) => {
  return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
};
