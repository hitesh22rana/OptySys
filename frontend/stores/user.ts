import { create } from "zustand";

import { IUserActivated } from "@/types/user";
import { IUserActivatedStore } from "@/types/store";

const useUserStore = create<IUserActivatedStore>()((set) => ({
  user: {} as IUserActivated,
  accessToken: "" as string,

  setUser: (user: IUserActivated) => set({ user }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  logoutUser: () =>
    set({ user: {} as IUserActivated, accessToken: "" as string }),
}));

export default useUserStore;
