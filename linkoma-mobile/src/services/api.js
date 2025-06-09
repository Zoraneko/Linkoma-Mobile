import axios from "axios";
import { Platform } from "react-native";
import { getToken } from "./tokenHelper";

const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL || "https://linkoma-be.onrender.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
