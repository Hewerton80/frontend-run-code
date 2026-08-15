import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";
import { FetchExerciseByUuIdResponse } from "../hooks/useFetchExerciseByUuId";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";

export const updateCachedStandaloneExercise = (
  {
    exerciseUuId,
    classroomUuId,
    listId,
  }: {
    exerciseUuId: string;
    classroomUuId?: string;
    listId?: number;
  },
  updater: Parameters<
    typeof setItemInCache<Partial<FetchExerciseByUuIdResponse>>
  >[1],
) => {
  const hasExerciseCache = hasQueryCache(
    exerciseQueryKeyFactory.detail(exerciseUuId, classroomUuId),
  );
  if (!hasExerciseCache) return;

  setItemInCache<Partial<FetchExerciseByUuIdResponse>>(
    exerciseQueryKeyFactory.detail(exerciseUuId, classroomUuId, listId),
    updater,
  );
};
