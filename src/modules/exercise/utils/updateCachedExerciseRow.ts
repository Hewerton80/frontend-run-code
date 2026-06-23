import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";
import { IExercise } from "../exerciseTypes";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";

export const updateCachedExerciseRow = (
  exerciseUuId: string,
  updater: Parameters<typeof setItemInCache<Partial<IExercise>>>[1],
) => {
  const hasExerciseCache = hasQueryCache(
    exerciseQueryKeyFactory.row(exerciseUuId),
  );
  if (!hasExerciseCache) return;

  setItemInCache<Partial<IExercise>>(
    exerciseQueryKeyFactory.row(exerciseUuId),
    updater,
  );
};
