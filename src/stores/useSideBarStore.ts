import { create } from "zustand";

export const SIDE_BAR_WIDTH = 240;

interface State {
  showOnlyIcons: boolean;
  // sideBarWidth: number;
  // resizingSideBar: boolean;
}

interface Actions {
  // setShowOnlyIcons: (showOnlyIcons: boolean) => void;
  // setSideBarWidth: (sideBarWidth: number) => void;
  // setResizingSideBar: (resizingSideBar: boolean) => void;
  toggleOnlyIcons: () => void;
}

export const useSideBarStore = create<State & Actions>((set) => ({
  showOnlyIcons: true,
  // sideBarWidth: SIDE_BAR_WIDTH,
  // resizingSideBar: false,
  // setShowOnlyIcons: (showOnlyIcons) => set({ showOnlyIcons }),
  // setSideBarWidth: (sideBarWidth) => set({ sideBarWidth }),
  // setResizingSideBar: (resizingSideBar) => set({ resizingSideBar }),
  toggleOnlyIcons: () =>
    set((state) => ({ showOnlyIcons: !state.showOnlyIcons })),
}));
