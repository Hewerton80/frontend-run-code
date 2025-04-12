import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const [, , clearAccessToken] = useSessionStorage("access_token");
  const router = useRouter();
  const logout = () => {
    clearAccessToken();
    router.replace("/login");
  };

  return { logout };
};
