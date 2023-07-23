import { create } from "zustand";

import { DetailsFormData } from "@/types/auth";
import { IDetailsStore } from "@/types/store";

const useDetailsStore = create<IDetailsStore>((set) => ({
  details: {} as DetailsFormData,

  setDetails: (name: string, value: string) =>
    set((state) => ({
      details: {
        ...state.details,
        [name]: value,
      },
    })),
}));

export default useDetailsStore;
