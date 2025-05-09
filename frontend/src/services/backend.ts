import axios from "axios";
import { BACKEND_BASE_URL, AUTH_TOKEN_KEY } from "../config";
import Cookies from "js-cookie";

const backendClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

backendClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default backendClient;
