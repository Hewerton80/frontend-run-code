import { memo } from "react";
import { LanguageNames } from "../types/languagesName";
import { LANGUAGES_CONFIG_MAP } from "../utils/languagesConfig";

interface LanguageOptionDisplayProps {
  languageName: LanguageNames;
}
export const LanguageOptionDisplay = memo(
  ({ languageName }: LanguageOptionDisplayProps) => {
    const languageConfig = LANGUAGES_CONFIG_MAP[languageName];
    return (
      <span className="flex items-center gap-2">
        <img
          src={languageConfig.url}
          alt={languageConfig.label}
          width={14}
          height={14}
        />
        {languageConfig.label}
      </span>
    );
  },
);

LanguageOptionDisplay.displayName = "LanguageOptionDisplay";
