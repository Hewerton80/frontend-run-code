import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IList } from "../../listProblemTypes";
import { useCallback, useState } from "react";

export const useClassroomListsTable = () => {
  const { loggedUser } = useAuth();

  const [listToEdit, setListToEdit] = useState<IList | null>(null);

  const openDialog = (list: IList) => {
    setListToEdit(list);
  };

  const closeDialog = useCallback(() => {
    setListToEdit(null);
  }, []);

  return { loggedUser, listToEdit, closeDialog, openDialog };
};
