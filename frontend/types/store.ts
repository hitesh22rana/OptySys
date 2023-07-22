import { IUser } from "./user";

export interface IUserStore {
  user: IUser;
  accessToken: string;

  setUser(user: IUser): void;
  setAccessToken(accessToken: string): void;
  getActivationStatus(): boolean;

  logoutUser(): void;
}

export interface IDashboardStore {
  isSidebarOpen: boolean;

  toggleSidebar(): void;
}
