import { useQuery } from "@tanstack/react-query";
import { IClassroom } from "../classroomType";
import { classroomQueryKeyFactory } from "../utils/classroomQueryKeyFactory";

export const useGetCachedClassrom = (classroomId: string) => {
  const { data: cachedClassroom } = useQuery<IClassroom | null>({
    queryKey: classroomQueryKeyFactory.detail(classroomId),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!classroomId,
  });

  return { cachedClassroom: cachedClassroom as IClassroom };
};
