import { ReactElement, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { RolesNames, RoleUserEnum } from "./modules/user/userTypets";
import { useAuth } from "@/modules/auth/hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactElement;
  roles?: RolesNames[];
};

export const ProtectedRoute = ({
  children,
  roles,
}: ProtectedRouteProps): ReactElement => {
  const { loggedUser } = useAuth();

  const shouldRender = useMemo(() => {
    if (!roles?.length) return true;

    if (!loggedUser) return false;

    return roles.includes(RoleUserEnum[loggedUser.role as number]);
  }, [loggedUser, roles]);

  if (!shouldRender) {
    return <Navigate to="/" replace />;
  }

  return children;
};
