import { cn } from "@/utils/cn";
import { memo } from "react";

interface ExerciseCardArtWindowProps {
  done: boolean;
}

export const ExerciseCardArtWindow = memo(
  ({ done }: ExerciseCardArtWindowProps) => {
    return (
      <div
        className={cn(
          "relative mt-2 flex-1 overflow-hidden rounded-xl ring-1 ring-white/10",
          done ? "card-holo card-art-medium" : "",
        )}
      >
        {/* {done && <span className="card-holo-layer" aria-hidden />} */}
        <div className="absolute inset-0 grid place-items-center">
          <span
            className={cn(
              "text-6xl drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)]",
              "transition-transform duration-300 group-hover:scale-110",
            )}
            aria-hidden
          >
            {done ? "🏆" : "⚔️"}
          </span>
        </div>
        {/* sheen overlay */}
        <span
          className="pointer-events-none absolute inset-0 card-sheen"
          aria-hidden
        />
        {/* grain */}
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(oklch(1 0 0 / 0.4) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
          aria-hidden
        />
      </div>
    );
  },
);

ExerciseCardArtWindow.displayName = "ExerciseCardArtWindow";
