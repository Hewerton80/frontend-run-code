import { IExercise } from "@/modules/exercise/exerciseTypes";
import { memo } from "react";

interface ExerciseCardTopBarProps {
  ex: IExercise;
}

export const ExerciseCardTopBar = memo(({ ex }: ExerciseCardTopBarProps) => {
  return <div className="z-10 flex items-center justify-end mb-2"></div>;
});
ExerciseCardTopBar.displayName = "ExerciseCardTopBar";
