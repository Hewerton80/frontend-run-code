import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";
import { IExercise } from "../exerciseTypes";

export const updateCachedExerciseOfList = (
  exerciseId: string,
  listId: number,
  exerciseData: Parameters<typeof setItemInCache<Partial<IExercise>>>[1],
) => {
  setItemInCache<IExercise>(
    exerciseQueryKeyFactory.ofList(exerciseId, listId),
    (oldExercise) => {
      if (!oldExercise) return oldExercise;
      return {
        ...oldExercise,
        ...exerciseData,
      };
    },
  );
};
