import { IUserActivated } from "./user";

export interface IUserActivatedStore {
  user: IUserActivated;
  accessToken: string;

  setUser(user: IUserActivated): void;
  setAccessToken(accessToken: string): void;
  logoutUser(): void;
}
