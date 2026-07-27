import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";
import { FetchExerciseByUuIdResponse } from "../hooks/useFetchExerciseByUuId";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";

export const updateCachedExerciseDetail = (
  exerciseUuId: string,
  updater: Parameters<
    typeof setItemInCache<Partial<FetchExerciseByUuIdResponse>>
  >[1],
) => {
  const hasExerciseCache = hasQueryCache(
    exerciseQueryKeyFactory.detail(exerciseUuId),
  );
  if (!hasExerciseCache) return;

  setItemInCache<Partial<FetchExerciseByUuIdResponse>>(
    exerciseQueryKeyFactory.detail(exerciseUuId),
    updater,
  );
};
