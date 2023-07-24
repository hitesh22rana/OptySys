import { create } from "zustand";

import { IUser } from "@/types/user";
import { IUserStore } from "@/types/store";

const useUserStore = create<IUserStore>()((set, get) => ({
  user: {
    activated: true,
  } as IUser,
  accessToken: "" as string,

  setUser: (user: IUser) => set({ user }),
  setAccessToken: (accessToken: string) => set({ accessToken }),

  getActivationStatus() {
    return get().user.activated;
  },

  logoutUser: () => set({ user: {} as IUser, accessToken: "" as string }),
}));

export default useUserStore;
