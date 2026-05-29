import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCachedClassrom } from "@/modules/classroom/hooks/useGetCachedClassrom";
import { useFetchListsByClassromUuid } from "../../hooks/useFetchListsByClassromUuid";

export const useClassroomListsTable = () => {
  const { loggedUser } = useLoggedUser();

  const params = useParams<{ classroomId: string }>();
  const [isOpenClassroomFormDialog, setOpenClassroomFormDialog] =
    useState(false);

  const { cachedClassroom: classroom } = useGetCachedClassrom(
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

  const openClassroomDialog = useCallback(() => {
    setOpenClassroomFormDialog(true);
  }, []);

  const closeClassroomDialog = useCallback(() => {
    setOpenClassroomFormDialog(false);
  }, []);

  return {
    openClassroomDialog,
    closeClassroomDialog,
    listIdsOfClassroom,
    canCreateList,
    classroom,
    isOpenClassroomFormDialog,
    loggedUser,
    isFetchingListsOfClassroom,
    listsOfClassroomError,
    refetchListsOfClassroom,
  };
};
