import { useTheme } from "@/hooks/useTheme";
import { CONSTANTS } from "@/utils/constants";
import { useEffect } from "react";

export function ThemeTamplate() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEYS.THEME) === "dark") {
      setTheme("dark");
    }
    localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEYS.THEME, "dark");
  }, [setTheme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEYS.THEME, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEYS.THEME, "light");
    }
  }, [theme]);

  return null;
}
