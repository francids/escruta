import backendClient from "./backend";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await backendClient.post("/login", { email, password });
    return response.data;
  },
};

export default authService;
