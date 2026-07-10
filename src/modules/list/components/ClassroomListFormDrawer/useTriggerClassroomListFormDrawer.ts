import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showClassroomListFormDrawer: boolean;
  listIdToEdit: number;
}

interface Actions {
  setShowClassroomListFormDrawer: (value: boolean | null) => void;
  setListIdToEdit: (value: number | null) => void;
}

const useClassroomListFormDrawerStore = create<State & Actions>((set) => ({
  showClassroomListFormDrawer: false,
  listIdToEdit: 0,
  setShowClassroomListFormDrawer: (value) =>
    set(() => ({ showClassroomListFormDrawer: value ?? false })),
  setListIdToEdit: (value) => set(() => ({ listIdToEdit: value ?? 0 })),
}));

export const useTriggerClassroomListFormDrawer = () => {
  const { showClassroomListFormDrawer, listIdToEdit } =
    useClassroomListFormDrawerStore(
      useShallow((s) => ({
        showClassroomListFormDrawer: s.showClassroomListFormDrawer,
        listIdToEdit: s.listIdToEdit,
      })),
    );

  const { setShowClassroomListFormDrawer, setListIdToEdit } =
    useClassroomListFormDrawerStore(
      useShallow((s) => ({
        setShowClassroomListFormDrawer: s.setShowClassroomListFormDrawer,
        setListIdToEdit: s.setListIdToEdit,
      })),
    );

  const closeClassroomListFormDrawer = useCallback(() => {
    setShowClassroomListFormDrawer(null);
    setListIdToEdit(null);
  }, [setListIdToEdit, setShowClassroomListFormDrawer]);

  const showClassroomListFormDrawerWithListId = useCallback(
    (listId: number | null) => {
      setListIdToEdit(listId);
      setShowClassroomListFormDrawer(true);
    },
    [setListIdToEdit, setShowClassroomListFormDrawer],
  );

  return {
    listIdToEdit,
    showClassroomListFormDrawer,
    closeClassroomListFormDrawer,
    showClassroomListFormDrawerWithListId,
  };
};
