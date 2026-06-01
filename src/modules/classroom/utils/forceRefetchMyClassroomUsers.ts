import { queryClient } from "@/utils/tanstackQueryHelpers/queryClient";
import { classroomQueryKeyFactory } from "./classroomQueryKeyFactory";

export const forceRefetchMyClassroomUsers = (classroomUuid: string) => {
  queryClient.invalidateQueries({
    queryKey: classroomQueryKeyFactory.users(classroomUuid),
    exact: false,
  });
};
