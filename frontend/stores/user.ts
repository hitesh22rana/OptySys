import { create } from "zustand";

import { IUserActivated } from "@/types/user";
import { IUserActivatedStore } from "@/types/store";

const useUserStore = create<IUserActivatedStore>()((set) => ({
  user: {} as IUserActivated,
  token: "" as string,

  setUser: (user: IUserActivated) => set({ user }),
  setToken: (token: string) => set({ token }),
}));

export default useUserStore;
