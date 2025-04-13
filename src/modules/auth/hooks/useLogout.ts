import { useClearGlobalStates } from "@/hooks/useClearGlobalStates";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const [, , clearAccessToken] = useSessionStorage("access_token");

  const router = useRouter();
  const { clearGlobalStates } = useClearGlobalStates();

  const logout = () => {
    clearAccessToken();
    clearGlobalStates();
    router.replace("/login");
  };

  return { logout };
};
