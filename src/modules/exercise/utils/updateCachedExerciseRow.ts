import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";
import { FetchExercisesResponseData } from "../hooks/useFetchExercises";

export const updateCachedExerciseRow = (
  exerciseUuId: string,
  updater: Parameters<
    typeof setItemInCache<Partial<FetchExercisesResponseData>>
  >[1],
) => {
  const hasExerciseCache = hasQueryCache(
    exerciseQueryKeyFactory.row(exerciseUuId),
  );
  if (!hasExerciseCache) return;

  setItemInCache<Partial<FetchExercisesResponseData>>(
    exerciseQueryKeyFactory.row(exerciseUuId),
    updater,
  );
};
