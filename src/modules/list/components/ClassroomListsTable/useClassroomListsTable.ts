import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IList } from "../../listTypes";
import { useCallback, useMemo, useState } from "react";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useParams } from "react-router-dom";

export const useClassroomListsTable = () => {
  const { loggedUser } = useAuth();

  const params = useParams<{ classroomId: string }>();
  const [isOpenClassroomFormDialog, setOpenClassroomFormDialog] =
    useState(false);

  const { classroom } = useGetClassroomById(params?.classroomId);

  const lists = useMemo(() => {
    return classroom?.lists?.map((list) => ({
      ...list,
      classroom,
    }));
  }, [classroom]);

  const [listToEdit, setListToEdit] = useState<IList | null>(null);

  const [isOpenListDialog, setIsOpen] = useState(false);

  const canCreateList = useMemo(() => {
    return classroom?.myClassroomPermissions?.canCreateList;
  }, [classroom]);

  const openClassroomDialog = useCallback(() => {
    setOpenClassroomFormDialog(true);
  }, []);

  const closeClassroomDialog = useCallback(() => {
    setOpenClassroomFormDialog(false);
  }, []);

  const openListDialog = useCallback(() => {
    if (!canCreateList) return;
    setIsOpen(true);
  }, [canCreateList]);

  const handleSetListToEdit = useCallback(
    (list: IList) => {
      setListToEdit(list);
      openListDialog();
    },
    [openListDialog]
  );

  const closeListDialog = useCallback(() => {
    setListToEdit(null);
    setIsOpen(false);
  }, []);

  return {
    loggedUser,
    listToEdit,
    isOpenListDialog,
    lists,
    isOpenClassroomFormDialog,
    classroom,
    canCreateList,
    openClassroomDialog,
    closeClassroomDialog,
    closeListDialog,
    openListDialog,
    handleSetListToEdit,
  };
};
