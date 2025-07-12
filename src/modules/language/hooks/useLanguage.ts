import { useLanguageStore } from "@/stores/useLanguageStore";
import { useShallow } from "zustand/react/shallow";
import { LanguageNames } from "../utils/languagesName";

export function useLanguage(defaultLanguage?: LanguageNames) {
  return useLanguageStore(
    useShallow((state) => {
      return {
        ...state,
        languageMode: defaultLanguage || state.languageMode,
      };
    })
  );
}
