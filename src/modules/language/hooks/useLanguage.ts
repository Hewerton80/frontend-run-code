import { useLanguageStore } from "@/stores/useLanguageStore";
import { useShallow } from "zustand/react/shallow";

export function useLanguage() {
  return useLanguageStore(useShallow((state) => state));
}
