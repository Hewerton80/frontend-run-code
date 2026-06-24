import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastArgs {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  isExiting?: boolean;
}

export interface ToastActionsContextType {
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
  };
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const DEFAULT_DURATION = 5000;

const timers = new Map<string, ReturnType<typeof setTimeout>>();

interface ToastStoreState {
  toasts: ToastArgs[];
}

interface ToastStoreActions {
  _addToast: (
    type: ToastArgs["type"],
    message: string,
    duration: number,
  ) => void;
  removeToast: (id: string) => void;
  _finalizeRemove: (id: string) => void;
  clearAll: () => void;
}

const useToastStore = create<ToastStoreState & ToastStoreActions>(
  (set, get) => ({
    toasts: [],

    _addToast: (type, message, duration) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      set((state) => ({
        toasts: [...state.toasts, { id, type, message, duration }],
      }));

      const handle = setTimeout(() => {
        get().removeToast(id);
      }, duration);
      timers.set(id, handle);
    },

    removeToast: (id) => {
      const handle = timers.get(id);
      if (handle !== undefined) {
        clearTimeout(handle);
        timers.delete(id);
      }
      // Apenas marca como saindo; a remoção real ocorre via onAnimationEnd
      // no ToastInner, que chama _finalizeRemove quando a animação CSS termina.
      set((state) => ({
        toasts: state.toasts.map((t) =>
          t.id === id ? { ...t, isExiting: true } : t,
        ),
      }));
    },

    // Chamado pelo ToastInner via onAnimationEnd — remove o toast do array
    // somente após a animação de saída ter concluído de verdade.
    _finalizeRemove: (id) => {
      set((state) => ({
        toasts: state.toasts.filter((n) => n.id !== id),
      }));
    },

    clearAll: () => {
      timers.forEach((handle) => clearTimeout(handle));
      timers.clear();
      // Marca todos como saindo; cada toast se auto-remove via onAnimationEnd.
      set((state) => ({
        toasts: state.toasts.map((t) => ({ ...t, isExiting: true })),
      }));
    },
  }),
);

export function useToast() {
  const toasts = useToastStore(useShallow((s) => s.toasts));
  const { removeToast, _finalizeRemove, clearAll } = useToastStore(
    useShallow(
      useShallow((s) => ({
        removeToast: s.removeToast,
        _finalizeRemove: s._finalizeRemove,
        clearAll: s.clearAll,
      })),
    ),
  );
  return { toasts, removeToast, finalizeRemove: _finalizeRemove, clearAll };
}

export const toast: ToastActionsContextType["toast"] = {
  success: (message, duration = DEFAULT_DURATION) =>
    useToastStore.getState()._addToast("success", message, duration),
  error: (message, duration = DEFAULT_DURATION) =>
    useToastStore.getState()._addToast("error", message, duration),
  warning: (message, duration = DEFAULT_DURATION) =>
    useToastStore.getState()._addToast("warning", message, duration),
  info: (message, duration = DEFAULT_DURATION) =>
    useToastStore.getState()._addToast("info", message, duration),
};
