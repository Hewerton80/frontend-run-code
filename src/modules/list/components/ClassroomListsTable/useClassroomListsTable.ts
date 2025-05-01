import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IList } from "../../listTypes";
import { useCallback, useState } from "react";

export const useClassroomListsTable = () => {
  const { loggedUser } = useAuth();

  const [listToEdit, setListToEdit] = useState<IList | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const handleSetListToEdit = (list: IList) => {
    setListToEdit(list);
    openDialog();
  };

  const closeDialog = useCallback(() => {
    setListToEdit(null);
    setIsOpen(false);
  }, []);

  return {
    loggedUser,
    listToEdit,
    isOpen,
    closeDialog,
    openDialog,
    handleSetListToEdit,
  };
};
