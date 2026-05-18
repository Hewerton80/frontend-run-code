import { useClearGlobalStates } from "@/hooks/useClearGlobalStates";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const useLogout = () => {
  const [, , clearAccessToken] = useSessionStorage("access_token");

  const navigate = useNavigate();
  const { clearGlobalStates } = useClearGlobalStates();

  const logout = () => {
    clearAccessToken();
    clearGlobalStates();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return { logout };
};
