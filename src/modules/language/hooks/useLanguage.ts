import { useShallow } from "zustand/react/shallow";
import { LanguageNames } from "../utils/languagesName";
import { create } from "zustand";
import { LanguageConfig, LANGUAGES_CONFIG_MAP } from "../utils/languagesConfig";

interface State {
  languageMode: LanguageConfig;
}

interface Actions {
  changeLanguageMode: (mode: LanguageConfig) => void;
}

export const useLanguageStore = create<State & Actions>((set) => ({
  languageMode: LANGUAGES_CONFIG_MAP.javascript, // Valor padrão
  changeLanguageMode: (mode: LanguageConfig) => {
    set(() => ({ languageMode: mode }));
  },
}));

export function useLanguage(defaultLanguage?: LanguageNames) {
  const languageMode = useLanguageStore(
    useShallow((state) => state.languageMode),
  );
  const changeLanguageMode = useLanguageStore(
    useShallow((state) => state.changeLanguageMode),
  );
  return { languageMode, changeLanguageMode };
}
