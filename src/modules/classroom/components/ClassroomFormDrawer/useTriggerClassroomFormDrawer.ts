import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showDrawer: boolean;
  classroomId: string | null;
}

interface Actions {
  setShowDrawer: (value: boolean) => void;
  setClassroomId: (value: string | null) => void;
}

const useClassroomFormDrawerStore = create<State & Actions>((set) => ({
  showDrawer: false,
  classroomId: null,
  setShowDrawer: (value) => set(() => ({ showDrawer: value })),
  setClassroomId: (value) => set(() => ({ classroomId: value })),
}));

export const useTriggerClassroomFormDrawer = () => {
  const { showDrawer, classroomId } = useClassroomFormDrawerStore(
    useShallow((s) => ({
      showDrawer: s.showDrawer,
      classroomId: s.classroomId,
    })),
  );

  const { setShowDrawer, setClassroomId } = useClassroomFormDrawerStore(
    useShallow((s) => ({
      setShowDrawer: s.setShowDrawer,
      setClassroomId: s.setClassroomId,
    })),
  );

  const openDrawer = useCallback(
    (classroomId?: string | null) => {
      setClassroomId(classroomId ?? null);
      setShowDrawer(true);
    },
    [setClassroomId, setShowDrawer],
  );

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setClassroomId(null);
  }, [setShowDrawer, setClassroomId]);

  return {
    showDrawer,
    classroomId,
    openDrawer,
    closeDrawer,
  };
};
