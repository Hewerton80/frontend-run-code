import { ToastVariants } from "@/components/ui/feedback/Toaster";
import { create } from "zustand";

interface State {
  show: boolean;
  variant?: ToastVariants;
}

interface Actions {
  toast: (toastArgs?: Omit<State, "show">) => void;
  closeToast: () => void;
}

export const useToastStore = create<State & Actions>((set) => ({
  show: false,
  variant: "default",
  closeToast: () => {
    set(() => ({ show: false, variant: "default" }));
  },
  toast: (toastArgs) => {
    set(() => ({ show: true, ...(toastArgs || {}) }));
  },
}));
