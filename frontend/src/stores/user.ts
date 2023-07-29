import { create } from "zustand";

import { IUser } from "@/src/types/user";
import { IUserStore } from "@/src/types/store";

const useUserStore = create<IUserStore>()((set, get) => ({
  user: {
    activated: true,
  } as IUser,
  accessToken: "" as string,

  setUser: (user: IUser) => set({ user }),
  setAccessToken: (accessToken: string) => set({ accessToken }),

  getActivationStatus() {
    if (get().accessToken === "") {
      return true;
    }
    return get().user.activated;
  },

  logoutUser: () => set({ user: {} as IUser, accessToken: "" as string }),
}));

export default useUserStore;
