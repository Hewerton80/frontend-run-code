import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "../utils/classroomQueryKeyFactory";
import { FetchClassroomByIdResponse } from "./useFetchClassroomById";

export const useGetCachedMyClassrooms = () => {
  const { data: cachedClassrooms } = useQuery<
    FetchClassroomByIdResponse[] | null
  >({
    queryKey: classroomQueryKeyFactory.myClassrooms(),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: true,
  });

  return { cachedClassrooms: cachedClassrooms as FetchClassroomByIdResponse[] };
};
