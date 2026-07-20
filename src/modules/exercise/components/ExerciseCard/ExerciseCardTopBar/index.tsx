import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { memo } from "react";

interface ExerciseCardTopBarProps {
  title: string;
}

export const ExerciseCardTopBar = memo(({ title }: ExerciseCardTopBarProps) => {
  return (
    <div className="relative z-10 flex items-center justify-between gap-2">
      <Tooltip textContent={title} align="center">
        <span className="line-clamp-1 text-[13px] font-semibold tracking-tight text-white">
          {title}
        </span>
      </Tooltip>
    </div>
  );
});
ExerciseCardTopBar.displayName = "ExerciseCardTopBar";
