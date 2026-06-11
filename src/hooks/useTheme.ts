import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { CONSTANTS } from "@/utils/constants";

// ── Types ──────────────────────────────────────────────────────────────────

export type Theme = "dark" | "light";

interface ThemeStoreState {
  theme: Theme;
}

interface ThemeStoreActions {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEYS.THEME);
  if (stored === "dark" || stored === "light") return stored;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

  return "light";
}

/**
 * Applies the given theme to the `<html>` element by toggling the
 * `dark` / `light` CSS class, enabling Tailwind's class-based dark mode.
 */
function applyThemeToDocument(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
}

// ── Bootstrap: apply theme before first render ─────────────────────────────

const initialTheme = getInitialTheme();
applyThemeToDocument(initialTheme);

// ── Store internal (never exported) ───────────────────────────────────────

const useThemeStore = create<ThemeStoreState & ThemeStoreActions>(
  (set, get) => ({
    theme: initialTheme,

    setTheme: (theme) => {
      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEYS.THEME, theme);
      applyThemeToDocument(theme);
      set({ theme });
    },

    toggleTheme: () => {
      const next: Theme = get().theme === "dark" ? "light" : "dark";
      get().setTheme(next);
    },
  }),
);

// ── Public hook (single external access point) ────────────────────────────

export function useTheme() {
  const theme = useThemeStore(useShallow((s) => s.theme));
  const toggleTheme = useThemeStore(useShallow((s) => s.toggleTheme));
  const setTheme = useThemeStore(useShallow((s) => s.setTheme));
  return { theme, toggleTheme, setTheme };
}
