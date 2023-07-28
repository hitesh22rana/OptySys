import { create } from "zustand";

import { IDashboardStore } from "@/types/store";

const useDashboardStore = create<IDashboardStore>((set, get) => ({
  isSidebarOpen: false,
  isLogoutAlert: false,

  toggleSidebar: () => set(() => ({ isSidebarOpen: !get().isSidebarOpen })),
  toggleLogoutAlert: () => set(() => ({ isLogoutAlert: !get().isLogoutAlert })),
}));

export default useDashboardStore;
