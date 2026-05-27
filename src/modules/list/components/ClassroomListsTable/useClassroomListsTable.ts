import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCachedClassrom } from "@/modules/classroom/hooks/useGetCachedClassrom";

export const useClassroomListsTable = () => {
  const { loggedUser } = useLoggedUser();

  const params = useParams<{ classroomId: string }>();
  const [isOpenClassroomFormDialog, setOpenClassroomFormDialog] =
    useState(false);

  const { cachedClassroom: classroom } = useGetCachedClassrom(
    params?.classroomId!,
  );

  const listIdsOfClassroom = useMemo(
    () => classroom?.lists?.map((list) => list.id),
    [classroom],
  );

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
  };
};
