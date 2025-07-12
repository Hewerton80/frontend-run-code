import {
  ToastDirection,
  ToastVariants,
} from "@/components/ui/feedback/Toaster";
import { create } from "zustand";

interface State {
  show: boolean;
  variant?: ToastVariants;
  title?: string;
  description?: string;
  direction?: ToastDirection;
}

interface Actions {
  toast: (toastArgs?: Omit<State, "show">) => void;
  closeToast: () => void;
}

export const useToastStore = create<State & Actions>((set) => ({
  show: false,
  title: undefined,
  description: undefined,
  variant: "default",
  closeToast: () => {
    set(() => ({
      show: false,
    }));
    setTimeout(() => {
      set(() => ({
        variant: "default",
        title: undefined,
        description: undefined,
        direction: undefined,
      }));
    }, 500);
  },
  toast: (toastArgs) => {
    set(() => ({ show: true, ...(toastArgs || {}) }));
  },
}));
