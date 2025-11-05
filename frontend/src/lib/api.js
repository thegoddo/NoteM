import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetcher = (url) => api.get(url).then((res) => res.data);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
