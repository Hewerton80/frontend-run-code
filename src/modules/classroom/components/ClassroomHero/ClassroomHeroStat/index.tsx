import { cn } from "@/utils/cn";
import { rgba } from "@/utils/colorHelpers";
import { JSX, memo } from "react";

interface ClassroomHeroStatProps {
  icon: JSX.Element;
  label: string;
  value: string;
  color: string;
}

export const ClassroomHeroStat = memo(
  ({ icon, label, value, color }: ClassroomHeroStatProps) => {
    const bg = `oklch(0.24 0.02 275)`;
    return (
      <div
        className={cn(
          "rounded-2xl px-3 py-2 w-full",
          "text-center backdrop-blur-sm",
        )}
        style={{
          background: `linear-gradient(135deg, ${bg}, ${rgba(bg, 0.2)})`,
        }}
      >
        <div
          className={cn("inline-grid h-8 w-8 place-items-center rounded-lg")}
          style={{ color, backgroundColor: rgba(color, 0.2) }}
        >
          {icon}
        </div>
        <div className="mt-2 text-xs uppercase font-medium text-white/90">
          {label}
        </div>
        <div className="text-lg font-black text-white">{value}</div>
      </div>
    );
  },
);

ClassroomHeroStat.displayName = "ClassroomHeroStat";
