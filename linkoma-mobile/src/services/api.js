import axios from "axios";
import { Platform } from "react-native";
import { getToken } from "./tokenHelper";

const api = axios.create({
  baseURL: "https://linkoma-be.onrender.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Instance không interceptor cho login
const apiNoAuth = axios.create({
  baseURL: "https://linkoma-be.onrender.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  // Chỉ gắn Authorization nếu đã có token
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Nếu không có token, đảm bảo không có header Authorization
    delete config.headers.Authorization;
  }
  return config;
});

export { api, apiNoAuth };
export default api;
