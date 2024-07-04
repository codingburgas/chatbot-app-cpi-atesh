import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "./storage";

const axiosInstance = axios.create({
  baseURL: "http://192.168.197.172:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await storage.load({ key: "accessToken" }).catch(() => null);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
