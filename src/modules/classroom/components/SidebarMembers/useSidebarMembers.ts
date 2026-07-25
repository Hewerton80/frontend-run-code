import { create } from "zustand";

type State = {
  showSidebarMembers: boolean;
};

type Actions = {
  setShowSidebarMembers: (show: boolean) => void;
};

const useSidebarMembersStore = create<State & Actions>((set) => ({
  showSidebarMembers: false,
  setShowSidebarMembers: (show: boolean) =>
    set(() => ({ showSidebarMembers: show })),
}));

export const useSidebarMembers = () => {
  const showSidebarMembers = useSidebarMembersStore(
    (s) => s.showSidebarMembers,
  );
  const setShowSidebarMembers = useSidebarMembersStore(
    (s) => s.setShowSidebarMembers,
  );

  return { showSidebarMembers, setShowSidebarMembers };
};
