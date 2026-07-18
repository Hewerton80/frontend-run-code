import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "../utils/classroomQueryKeyFactory";
import { FetchClassroomByIdResponse } from "./useFetchClassroomById";

export const useGetCachedClassrom = (classroomId: string) => {
  const { data: cachedClassroom } = useQuery<FetchClassroomByIdResponse | null>(
    {
      queryKey: classroomQueryKeyFactory.detail(classroomId),
      queryFn: () => null,
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: !!classroomId,
    },
  );

  return { cachedClassroom: cachedClassroom as FetchClassroomByIdResponse };
};
