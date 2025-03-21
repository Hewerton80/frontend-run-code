import { useProgressBar } from "@/hooks/useProgressBar";
import { twMerge } from "tailwind-merge";

export function ProgressHeaderBar() {
  const { progressValue } = useProgressBar();
  const height = 3;
  return (
    <div
      className={twMerge("absolute bottom-0 left-0 translate-y-1/2", "w-full")}
      style={{ height }}
    >
      {progressValue > 0 && (
        <div
          className={twMerge(
            "relative bg-blue-500/80 rounded-r-2xl ease-in-out transition-all",
            "after:absolute after:right-0 after:-translate-y-0.5 after:translate-x-1/2",
            "after:rounded-full after:bg-blue-500 after:w-2.5 after:h-2.5 after:animate-ping"
          )}
          style={{ width: `${progressValue}%`, height }}
        >
          <span
            className={twMerge(
              "absolute right-0 -translate-y-0.5 translate-x-1/2",
              "rounded-full bg-blue-500 w-2 h-2"
            )}
          />
        </div>
      )}
    </div>
  );
}
