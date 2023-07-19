import { LoginData, RegisterData, VerifyData } from "@/types/auth";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// all auth routes
export const register = (data: RegisterData): Promise<any> =>
  api.post("/auth/register", data);
export const verify = (data: VerifyData): Promise<any> =>
  api.post("/auth/verify", data);
export const login = (data: LoginData): Promise<any> =>
  api.post("/auth/login", data);
export const logout = (): Promise<any> => api.post("/auth/logout");
