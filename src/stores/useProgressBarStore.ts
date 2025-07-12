import { create } from "zustand";

type ProgressStateType = "initial" | "inProgress" | "completing" | "completed";

interface State {
  state: ProgressStateType;
  value: number;
}

interface Actions {
  //   start: () => void;
  //   done: () => void;
  //   reset: () => void;
  setValue: (cb: (currnetValue: number) => number) => void;
  setState: (state: ProgressStateType) => void;
}

export const useProgressBarStore = create<State & Actions>((set) => ({
  state: "initial",
  value: 0,
  //   start: () => {
  //     set(() => ({ state: "inProgress" }));
  //   },
  //   done: () => {
  //     set(() => ({ state: "completed" }));
  //   },
  //   reset: () => {
  //     set(() => ({ state: "initial" }));
  //   },
  setValue: (cb) => set((state) => ({ value: cb(state.value) })),
  setState: (state) => set(() => ({ state })),
}));
