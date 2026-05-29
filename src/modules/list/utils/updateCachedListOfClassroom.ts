import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { listOfExercisesQueryKeyFactory } from "./listOfExercisesQueryKeyFactory";
import { IFetchListsByClassromUuidResponse } from "../hooks/useFetchListsByClassromUuid";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";

export const updateCachedListOfClassroom = (
  listId: number,
  updater: Parameters<
    typeof setItemInCache<Partial<IFetchListsByClassromUuidResponse>>
  >[1],
) => {
  const hasListCache = hasQueryCache(
    listOfExercisesQueryKeyFactory.oneOfClassroom(listId),
  );
  if (!hasListCache) return;
  setItemInCache<Partial<IFetchListsByClassromUuidResponse>>(
    listOfExercisesQueryKeyFactory.oneOfClassroom(listId),
    updater,
  );
};
