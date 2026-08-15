import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";
import { ExerciseOfListDto } from "@/modules/list/hooks/useFetchListOfExercises";

export const updateCachedExerciseOfList = (
  exerciseUuId: string,
  listId: number,
  updater: Parameters<typeof setItemInCache<Partial<ExerciseOfListDto>>>[1],
) => {
  const hasExerciseCache = hasQueryCache(
    exerciseQueryKeyFactory.ofList(exerciseUuId, listId),
  );
  if (!hasExerciseCache) return;

  setItemInCache<Partial<ExerciseOfListDto>>(
    exerciseQueryKeyFactory.ofList(exerciseUuId, listId),
    updater,
  );
};
