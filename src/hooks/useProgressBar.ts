import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useRef } from "react";

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


export const useProgressBar = () => {
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const { value, state, setState, setValue } = useProgressBarStore(
    useShallow((state) => state)
  );

  const handleClearInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const startProgress = () => {
    if (state === "inProgress" || state === "completing") return;
    handleClearInterval();
    setState("inProgress");
    intervalId.current = setInterval(() => {
      setValue((current) => {
        if (current >= 99) {
          clearInterval(intervalId.current!);
          intervalId.current = null;
          return current;
        }
        return current + 1; // Incrementa lentamente até 99
      });
    }, 200); // Intervalo de 100ms para simular progresso lento
  };

  const doneProgress = () => {
    if (state === "completing") return;
    handleClearInterval();
    setState("completing");
    intervalId.current = setInterval(() => {
      setValue((current) => {
        if (current >= 100) {
          handleClearInterval();
          setState("initial");
          return 0;
        }
        return current + 5; // Incrementa rapidamente até 100
      });
    }, 50); // Intervalo de 50ms para simular progresso rápido
  };

  return { progressValue: value, startProgress, doneProgress };
};
