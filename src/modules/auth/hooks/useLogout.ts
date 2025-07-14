import { useClearGlobalStates } from "@/hooks/useClearGlobalStates";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [, , clearAccessToken] = useSessionStorage("access_token");

  const navigate = useNavigate();
  const { clearGlobalStates } = useClearGlobalStates();

  const logout = () => {
    clearAccessToken();
    clearGlobalStates();
    navigate("/login", { replace: true });
  };

  return { logout };
};
