import { useProgressBarStore } from "@/stores/useProgressBarStore";
import { useShallow } from "zustand/react/shallow";

export const useProgressBar = () => {
  let intervalId: NodeJS.Timeout | null = null; // Armazena a referência do intervalo

  const { value, state, setState, setValue } = useProgressBarStore(
    useShallow((state) => state)
  );

  const handleClearInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const startProgress = () => {
    if (state === "inProgress" || state === "completing") return;
    handleClearInterval();
    setState("inProgress");
    intervalId = setInterval(() => {
      setValue((current) => {
        if (current >= 99) {
          clearInterval(intervalId!);
          intervalId = null;
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
    intervalId = setInterval(() => {
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
