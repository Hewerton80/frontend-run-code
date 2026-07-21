import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetCachedClassromById } from "@/modules/classroom/hooks/useGetCachedClassromById";
import { useFetchListsByClassromUuid } from "../../hooks/useFetchListsByClassromUuid";

export const useClassroomListsTable = () => {
  const { loggedUser } = useLoggedUser();

  const params = useParams<{ classroomId: string }>();

  const { cachedClassroom: classroom } = useGetCachedClassromById(
    params?.classroomId!,
  );
  const {
    listIdsOfClassroom,
    isFetchingListsOfClassroom,
    listsOfClassroomError,
    refetchListsOfClassroom,
  } = useFetchListsByClassromUuid(params?.classroomId!);

  const canCreateList = useMemo(
    () => classroom?.myClassroomPermissions?.canCreateList,
    [classroom],
  );

  return {
    listIdsOfClassroom,
    canCreateList,
    classroom,
    loggedUser,
    isFetchingListsOfClassroom,
    listsOfClassroomError,
    refetchListsOfClassroom,
  };
};
