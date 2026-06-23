import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showClassroomListFormDialog: boolean;
  listIdToEdit: number;
}

interface Actions {
  setShowClassroomListFormDialog: (value: boolean | null) => void;
  setListIdToEdit: (value: number | null) => void;
}

const useClassroomListFormDialogStore = create<State & Actions>((set) => ({
  showClassroomListFormDialog: false,
  listIdToEdit: 0,
  setShowClassroomListFormDialog: (value) =>
    set(() => ({ showClassroomListFormDialog: value ?? false })),
  setListIdToEdit: (value) => set(() => ({ listIdToEdit: value ?? 0 })),
}));

export const useTriggerClassroomListFormDialog = () => {
  const { showClassroomListFormDialog, listIdToEdit } =
    useClassroomListFormDialogStore(
      useShallow((s) => ({
        showClassroomListFormDialog: s.showClassroomListFormDialog,
        listIdToEdit: s.listIdToEdit,
      })),
    );

  const { setShowClassroomListFormDialog, setListIdToEdit } =
    useClassroomListFormDialogStore(
      useShallow((s) => ({
        setShowClassroomListFormDialog: s.setShowClassroomListFormDialog,
        setListIdToEdit: s.setListIdToEdit,
      })),
    );

  const closeClassroomListFormDialog = useCallback(() => {
    setShowClassroomListFormDialog(null);
    setListIdToEdit(null);
  }, [setListIdToEdit, setShowClassroomListFormDialog]);

  const showClassroomListFormDialogWithListId = useCallback(
    (listId: number | null) => {
      setListIdToEdit(listId);
      setShowClassroomListFormDialog(true);
    },
    [setListIdToEdit, setShowClassroomListFormDialog],
  );

  return {
    listIdToEdit,
    showClassroomListFormDialog,
    closeClassroomListFormDialog,
    showClassroomListFormDialogWithListId,
  };
};
