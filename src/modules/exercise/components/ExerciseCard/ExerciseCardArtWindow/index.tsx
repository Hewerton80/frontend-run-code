import { IExercise } from "@/modules/exercise/exerciseTypes";
import { SubmissionStatus } from "@/modules/submission/submissionType";
import { cn } from "@/utils/cn";
import { memo, useMemo } from "react";

interface ExerciseCardArtWindowProps {
  ex: IExercise;
}

export const ExerciseCardArtWindow = memo(
  ({ ex }: ExerciseCardArtWindowProps) => {
    const submissionStatus = useMemo(
      () => ex?.submissionStatus!,
      [ex?.submissionStatus],
    );

    const done = submissionStatus === SubmissionStatus.ACCEPTED;
    return (
      <div
        className={cn(
          "aspect-94/53 relative overflow-hidden rounded-xl ring-1 ring-white/10",
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
