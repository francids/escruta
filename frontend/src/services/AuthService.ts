import backendClient from "@/backend";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "@/config";
import type { AxiosResponse } from "axios";

export default {
  login: async (email: string, password: string) => {
    const response: AxiosResponse = await backendClient.post("/login", {
      email,
      password,
    });
    return response.data;
  },
  register: async (email: string, password: string, fullName: string) => {
    const response: AxiosResponse = await backendClient.post("/register", {
      email,
      password,
      fullName,
    });
    return response;
  },
  getUser: async () => {
    const token = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) || "{}");
    const response: AxiosResponse = await backendClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return response.data;
  },
};
