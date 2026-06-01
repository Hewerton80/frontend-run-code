import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { hasQueryCache } from "@/utils/tanstackQueryHelpers/hasQueryCache";
import { classroomQueryKeyFactory } from "./classroomQueryKeyFactory";
import { ITeacher } from "@/modules/user/userTypets";

export const updateCachedClassroomUserDetail = (
  userUuid: string,
  updater: Parameters<typeof setItemInCache<Partial<ITeacher>>>[1],
) => {
  const hasCache = hasQueryCache(classroomQueryKeyFactory.userDetail(userUuid));
  if (!hasCache) return;
  setItemInCache<Partial<ITeacher>>(
    classroomQueryKeyFactory.userDetail(userUuid),
    updater,
  );
};
