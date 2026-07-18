import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";

export interface FetchClassroomByIdResponse {
  uuid: string;
  name: string;
  languages: string;
  color: string;
  emoji: string;
  status: number;
  totalExercisesCount: number;
  contentVersion: number;
  createdAt: string;
  author: {
    uuid: string;
    email: string;
    name: string;
  };
  userStats?: {
    totalXp?: number | null;
    completedExercises?: number | null;
    progress?: number | null;
    lastActivityAt?: string | null;
  };

  myClassroomPermissions?: {
    canCreateList: boolean | null | undefined;
    canDeleteList: boolean | null | undefined;
    canEditClassroom: boolean | null | undefined;
    canEditList: boolean | null | undefined;
    canManageExercises: boolean | null | undefined;
    canManageTeachers: boolean | null | undefined;
    canRemoveMember: boolean | null | undefined;
  };
}

export const useFetchClassroomById = (classroomId?: string) => {
  const { apiBase } = useAxios();

  const {
    data: classroom,
    isFetching: isFetchingClassroom,
    error: classroomError,
    refetch: refetchClassroom,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.detail(classroomId),
    queryFn: async ({ signal }) => {
      const { data } = await apiBase.get<FetchClassroomByIdResponse>(
        `/classroom/${classroomId}`,
        { signal },
      );
      return data;
    },

    enabled: !!classroomId,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });

  return {
    classroom,
    isFetchingClassroom,
    classroomError,
    refetchClassroom,
  };
};
