import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IListProblem } from "../../listProblemTypes";
import { useCallback, useState } from "react";

export const useClassroomListsTable = () => {
  const { loggedUser } = useAuth();

  const [listToEdit, setListToEdit] = useState<IListProblem | null>(null);

  const openDialog = (list: IListProblem) => {
    setListToEdit(list);
  };

  const closeDialog = useCallback(() => {
    setListToEdit(null);
  }, []);

  return { loggedUser, listToEdit, closeDialog, openDialog };
};
