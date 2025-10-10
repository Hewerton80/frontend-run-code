import { ReactElement, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { RoleType, RoleUser } from "./modules/user/userTypets";
import { useAuth } from "@/modules/auth/hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactElement;
  roles?: RoleType[];
};

export const ProtectedRoute = ({
  children,
  roles,
}: ProtectedRouteProps): ReactElement => {
  const { loggedUser } = useAuth();

  const shouldRender = useMemo(() => {
    if (!roles?.length) return true;

    if (!loggedUser) return false;

    return roles.some((role) => role === RoleUser[loggedUser?.role!]);
  }, [loggedUser, roles]);

  if (!shouldRender) {
    return <Navigate to="/" replace />;
  }

  return children;
};
