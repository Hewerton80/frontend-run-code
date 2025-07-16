import { useTheme } from "@/hooks/useTheme";
import { MdOutlineWbSunny } from "react-icons/md";
import { IconButton } from "../IconButton";
import { FiMoon } from "react-icons/fi";

export function ToogleThemeButton() {
  const { toggleTheme, theme } = useTheme();

  return (
    <IconButton
      variantStyle="dark-ghost"
      onClick={toggleTheme}
      icon={theme === "dark" ? <FiMoon /> : <MdOutlineWbSunny />}
    />
  );
}
