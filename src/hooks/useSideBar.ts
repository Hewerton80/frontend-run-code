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

import { useShallow } from "zustand/react/shallow";

export function useSideBar() {
  const {
    showOnlyIcons,
    // sideBarWidth,
    // resizingSideBar,
    // setResizingSideBar,
    // setShowOnlyIcons,
    // setSideBarWidth,
    toggleOnlyIcons,
  } = useSideBarStore(useShallow((state) => state));

  // useEffect(() => {
  //   if (sideBarWidth < MIN_SIDE_BAR_WIDTH) {
  //     setShowOnlyIcons(true);
  //     setSideBarWidth(INITIAL_SIDE_BAR_WIDTH);
  //   } else if (sideBarWidth < INITIAL_SIDE_BAR_WIDTH) {
  //     setSideBarWidth(INITIAL_SIDE_BAR_WIDTH);
  //   }
  // }, [sideBarWidth, setShowOnlyIcons, setSideBarWidth]);

  return {
    showOnlyIcons,
    // sideBarWidth,
    // resizingSideBar,
    // setResizingSideBar,
    // setShowOnlyIcons,
    // setSideBarWidth,
    toggleOnlyIcons,
  };
}
