import {
  DetailsFormData,
  LoginData,
  RegisterData,
  VerifyData,
} from "@/types/auth";
import { IUser } from "@/types/user";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

function setAuthorizationHeader(accessToken: string) {
  api.defaults.headers["Authorization"] = accessToken;
}

// all auth routes
export const register = (data: RegisterData): Promise<any> =>
  api.post("/auth/register", data);
export const verify = (data: VerifyData): Promise<any> =>
  api.post("/auth/verify", data);
export const login = (data: LoginData): Promise<any> =>
  api.post("/auth/login", data);
export const logout = (accessToken: string): Promise<any> => {
  setAuthorizationHeader(accessToken);
  return (async () => {
    api.post("/auth/logout");
  })();
};

// all user routes
export const getUser = (accessToken: string): Promise<any> => {
  setAuthorizationHeader(accessToken);
  return (async () => {
    return api.get("/users");
  })();
};

export const updateUser = (
  accessToken: string,
  data: DetailsFormData
): Promise<any> => {
  setAuthorizationHeader(accessToken);
  return (async () => {
    return api.put("/users", data);
  })();
};
