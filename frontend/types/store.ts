import { IUserActivated } from "./user";

export interface IUserActivatedStore {
  user: IUserActivated;
  token: string;

  setUser(user: IUserActivated): void;
  setToken(token: string): void;
}
