import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";
import { classroomQueryKeyFactory } from "./classroomQueryKeyFactory";
import { FetchClassroomByIdResponse } from "../hooks/useFetchClassroomById";

export const updateCachedClassroom = (
  classroomUuid: string,
  updater: Parameters<
    typeof setItemInCache<Partial<FetchClassroomByIdResponse>>
  >[1],
) => {
  const hasCache = hasQueryCache(
    classroomQueryKeyFactory.detail(classroomUuid),
  );
  if (!hasCache) return;
  setItemInCache<Partial<FetchClassroomByIdResponse>>(
    classroomQueryKeyFactory.detail(classroomUuid),
    updater,
  );
};
