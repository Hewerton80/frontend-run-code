import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "../utils/classroomQueryKeyFactory";
import { IClassroom } from "../classroomType";

export const useGetCachedClassroomRow = (classroomUuid: string) => {
  const { data: cachedClassroom } = useQuery({
    queryKey: classroomQueryKeyFactory.row(classroomUuid),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!classroomUuid,
  });

  return { cachedClassroom: cachedClassroom! as IClassroom };
};
