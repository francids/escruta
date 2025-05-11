import axios from "axios";
import { BACKEND_BASE_URL } from "./config";

const backendClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendClient;
