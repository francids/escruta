import backendClient from "../backend";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "../config";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await backendClient.post("/login", { email, password });
    return response.data;
  },
  getUser: async () => {
    const token = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) || "{}");
    const response = await backendClient.get("/user", {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return response.data;
  }
};

export default authService;
