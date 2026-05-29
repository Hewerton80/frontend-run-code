import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { listOfExercisesQueryKeyFactory } from "@/modules/list/utils/listOfExercisesQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export interface IFetchListsByClassromUuidResponse {
  id: number;
  totalExercises: number;
  classroom: { uuid: string };
  solvedsMap: Record<string, boolean>;
  title: string;
  startDate: string | null;
  endDate: string | null;
  status: number;
  author: {
    uuid: string;
    name: string;
    surname: string;
    email: string;
    avatarUrl: string | null;
    avatarBgColor: string | null;
    avatarFontColor: string | null;
  };
}

export const useFetchListsByClassromUuid = (classroomUuid: string) => {
  const { apiBase } = useAxios();

  const {
    data: listIdsOfClassroom,
    isLoading: isFetchingListsOfClassroom,
    error: listsOfClassroomError,
    refetch: refetchListsOfClassroom,
  } = useQuery({
    queryKey: listOfExercisesQueryKeyFactory.allOfClassroom(classroomUuid),
    queryFn: async ({ signal }) => {
      const { data } = await apiBase.get<IFetchListsByClassromUuidResponse[]>(
        `/list/classroom/${classroomUuid}`,
        { signal },
      );

      return data.map((list) => {
        const concatenated = { ...list, classroom: { uuid: classroomUuid } };
        setItemInCache(
          listOfExercisesQueryKeyFactory.oneOfClassroom(list.id),
          concatenated,
        );
        return concatenated;
      });
    },
    enabled: !!classroomUuid,
    staleTime: 60 * 1000 * 30, // 30 minutes
    select: (data) => data.map((list) => list.id),
  });

  return {
    listIdsOfClassroom,
    isFetchingListsOfClassroom,
    listsOfClassroomError,
    refetchListsOfClassroom,
  };
};
