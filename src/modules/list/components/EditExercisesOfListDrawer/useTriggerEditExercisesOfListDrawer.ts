import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showDrawer: boolean;
  listId: number | null;
  classroomId: string | null;
}

interface Actions {
  setShowDrawer: (value: boolean) => void;
  setListId: (value: number | null) => void;
  setClassroomId: (value: string | null) => void;
}

const useEditExercisesOfListDrawerStore = create<State & Actions>((set) => ({
  showDrawer: false,
  listId: null,
  classroomId: null,
  setShowDrawer: (value) => set(() => ({ showDrawer: value })),
  setListId: (value) => set(() => ({ listId: value })),
  setClassroomId: (value) => set(() => ({ classroomId: value })),
}));

export const useTriggerEditExercisesOfListDrawer = () => {
  const { showDrawer, listId, classroomId } = useEditExercisesOfListDrawerStore(
    useShallow((s) => ({
      showDrawer: s.showDrawer,
      listId: s.listId,
      classroomId: s.classroomId,
    })),
  );

  const { setShowDrawer, setListId, setClassroomId } =
    useEditExercisesOfListDrawerStore(
      useShallow((s) => ({
        setShowDrawer: s.setShowDrawer,
        setListId: s.setListId,
        setClassroomId: s.setClassroomId,
      })),
    );

  const openDrawer = useCallback(
    (listId: number, classroomId: string) => {
      setListId(listId);
      setClassroomId(classroomId);
      setShowDrawer(true);
    },
    [setListId, setClassroomId, setShowDrawer],
  );

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setListId(null);
    setClassroomId(null);
  }, [setShowDrawer, setListId, setClassroomId]);

  return {
    showDrawer,
    listId,
    classroomId,
    openDrawer,
    closeDrawer,
  };
};
