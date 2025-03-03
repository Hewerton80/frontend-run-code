import { LanguageNames } from "@/types/languagesName";
import { create } from "zustand";

interface State {
  languageMode: LanguageNames;
}

interface Actions {
  changeLanguageMode: (mode: LanguageNames) => void;
}

export const useLanguageStore = create<State & Actions>((set) => ({
  languageMode: "javascript",
  changeLanguageMode: (mode: LanguageNames) => {
    set(() => ({ languageMode: mode }));
  },
}));
