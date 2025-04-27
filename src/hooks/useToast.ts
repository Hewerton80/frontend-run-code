import { useToastStore } from "@/stores/useToastStore";
import { useShallow } from "zustand/react/shallow";

export function useToast() {
  const { toast } = useToastStore();
  return { toast };
}
