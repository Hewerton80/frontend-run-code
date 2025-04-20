"use client";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ClassroomKeys, IClassroom } from "../classroomType";

export const useGetMyClassrooms = () => {
  const { apiBase } = useAxios();

  const {
    data: classrooms,
    isLoading: isLoadingClassrooms,
    refetch: refetchClassrooms,
    error: errorClassrooms,
  } = useQuery({
    queryKey: [ClassroomKeys.List],
    queryFn: async () => {
      const { data } = await apiBase.get<IClassroom[]>("/classroom/me");
      return data;
    },
    enabled: true,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return {
    classrooms,
    isLoadingClassrooms,
    errorClassrooms,
    refetchClassrooms,
  };
};
