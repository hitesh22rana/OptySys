import { create } from "zustand";

import { DetailsFormData } from "@/src/types/auth";
import { IDetailsStore } from "@/src/types/store";
import { Experience, Social } from "@/src/types/user";

const useDetailsStore = create<IDetailsStore>((set) => ({
  details: {
    summary: "",
    socials: {} as Social,
    skills: Array<string>(),
    experiences: Array<Experience>(),
    achievements: Array<string>(),
  } as DetailsFormData,

  setDetails: (name: string, value: string) =>
    set((state) => ({
      details: {
        ...state.details,
        [name]: value,
      },
    })),
}));

export default useDetailsStore;
