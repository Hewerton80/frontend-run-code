import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";
import { IExercise } from "../exerciseTypes";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";

export const updateCachedExerciseOfList = (
  exerciseUuId: string,
  listId: number,
  updater: Parameters<typeof setItemInCache<Partial<IExercise>>>[1],
) => {
  const hasExerciseCache = hasQueryCache(
    exerciseQueryKeyFactory.ofList(exerciseUuId, listId),
  );
  if (!hasExerciseCache) return;

  setItemInCache<Partial<IExercise>>(
    exerciseQueryKeyFactory.ofList(exerciseUuId, listId),
    updater,
  );
};
