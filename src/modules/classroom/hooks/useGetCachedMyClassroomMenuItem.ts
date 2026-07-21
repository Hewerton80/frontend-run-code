import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "../utils/classroomQueryKeyFactory";
import { FetchMyClassroomsResponse } from "./useFetchMyClassrooms";

export const useGetCachedMyClassroomMenuItem = (classroomUuid: string) => {
  const { data: cachedMenuItemClassroom } = useQuery({
    queryKey: classroomQueryKeyFactory.menuItem(classroomUuid),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!classroomUuid,
  });

  return {
    cachedMenuItemClassroom:
      cachedMenuItemClassroom! as FetchMyClassroomsResponse,
  };
};
