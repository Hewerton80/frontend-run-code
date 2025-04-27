import { useToastStore } from "@/stores/useToastStore";

export function useToast() {
  const { toast } = useToastStore();
  return { toast };
}
