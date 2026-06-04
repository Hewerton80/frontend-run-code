import { useClearGlobalStates } from "@/hooks/useClearGlobalStates";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useCallback } from "react";
import { clearLoggedUser } from "./useLoggedUser";

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearGlobalStates } = useClearGlobalStates();

  const logout = useCallback(() => {
    sessionStorage.clear();
    clearGlobalStates();
    clearLoggedUser();
    navigate(ROUTES.LOGIN, { replace: true });
  }, [clearGlobalStates, navigate]);

  return { logout };
};
