import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";
import { classroomQueryKeyFactory } from "./classroomQueryKeyFactory";
import { IClassroom } from "@/modules/classroom/classroomType";

export const updateCachedClassroom = (
  classroomId: string,
  updater: Parameters<typeof setItemInCache<Partial<IClassroom>>>[1],
) => {
  const hasCache = hasQueryCache(classroomQueryKeyFactory.detail(classroomId));
  if (!hasCache) return;
  setItemInCache<Partial<IClassroom>>(
    classroomQueryKeyFactory.detail(classroomId),
    updater,
  );
};
