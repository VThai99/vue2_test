import axios from "axios";

const API = axios.create({
  baseURL: "https://650862d356db83a34d9c4141.mockapi.io/api/",
  responseType: "json",
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);
export default API;
