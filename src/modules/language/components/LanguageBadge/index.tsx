import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { LanguageNames } from "../../types/languagesName";
import { LANGUAGES_CONFIG_MAP } from "../../utils/languagesConfig";
import { cn } from "@/utils/cn";

export function LanguageBadge({
  lang,
  size = "sm",
}: {
  lang: LanguageNames;
  size?: "sm" | "md";
}) {
  const meta = LANGUAGES_CONFIG_MAP[lang];
  const dim = size === "sm" ? "size-6.5 text-[10px]" : "size-8 text-xs";
  return (
    <Tooltip textContent={meta.label} side="top" align="center">
      <span
        title={meta.label}
        aria-label={meta.label}
        className={cn(
          "inline-grid place-items-center rounded-full font-black shadow-card",
          dim,
        )}
        style={{ background: meta.bgColor, color: meta.fgColor }}
      >
        {meta.icon}
      </span>
    </Tooltip>
  );
}

export function LanguagePill({ lang }: { lang: LanguageNames }) {
  const meta = LANGUAGES_CONFIG_MAP[lang];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{
        background: `color-mix(in oklab, ${meta.fgColor} 20%, transparent)`,
        color: meta.fgColor,
      }}
    >
      <span
        className="inline-grid h-4 w-4 place-items-center rounded font-black text-black text-[8px]"
        style={{ background: meta.fgColor }}
        aria-label={meta.label}
      >
        {meta.icon}
      </span>
      {meta.label}
    </span>
  );
}
