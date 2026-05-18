import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RoleType, RoleUser } from "@/modules/user/userTypets";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { ROUTE_PATTERNS } from "./routes";

type ProtectedRouteProps = {
  roles?: RoleType[];
};

/**
 * Guard de autenticação baseado em roles.
 * Usa <Outlet /> para renderizar as rotas filhas quando autorizado.
 * Redireciona para HOME quando não autorizado.
 */
export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { loggedUser } = useAuth();

  const shouldRender = useMemo(() => {
    if (!roles?.length) return true;
    if (!loggedUser) return false;
    return roles.some((role) => role === RoleUser[loggedUser?.role!]);
  }, [loggedUser, roles]);

  if (!shouldRender) {
    return <Navigate to={ROUTE_PATTERNS.HOME} replace />;
  }

  return <Outlet />;
};
