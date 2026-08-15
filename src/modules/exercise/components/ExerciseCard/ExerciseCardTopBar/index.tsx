import { ExerciseOfListDto } from "@/modules/list/hooks/useFetchListOfExercises";
import { memo } from "react";

interface ExerciseCardTopBarProps {
  ex: ExerciseOfListDto;
}

export const ExerciseCardTopBar = memo(({ ex }: ExerciseCardTopBarProps) => {
  return <div className="z-10 flex items-center justify-end mb-2"></div>;
});
ExerciseCardTopBar.displayName = "ExerciseCardTopBar";
