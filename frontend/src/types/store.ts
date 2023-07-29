import { DetailsFormData } from "@/src/types/auth";
import { Experience, IUser, Social } from "@/src/types/user";

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
  isLogoutAlert: boolean;

  toggleSidebar(): void;
  toggleLogoutAlert(): void;
}

export interface IDetailsStore {
  details: DetailsFormData;

  setDetails(
    name: string,
    value: string | Array<string> | Array<Social> | Array<Experience>
  ): void;
}
