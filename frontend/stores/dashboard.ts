import { create } from "zustand";

import { IDashboardStore } from "@/types/store";

const useDashboardStore = create<IDashboardStore>((set, get) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set(() => ({ isSidebarOpen: !get().isSidebarOpen })),
}));

export default useDashboardStore;
