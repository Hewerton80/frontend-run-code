import { ReactNode, useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useLocation, matchPath } from "react-router-dom";
import { RoleUser } from "@/modules/user/userTypets";
import { ROUTES } from "@/routes/routes";
interface IHeaderMenu {
  text: string;
  icon: ReactNode;
  link: string;
  isActive?: boolean;
}
export const useGetHeaderMenuItems = () => {
  const { loggedUser } = useLoggedUser();
  const location = useLocation();

  const headerMenuItems = useMemo<IHeaderMenu[]>(() => {
    if (loggedUser?.role === RoleUser.SUPER_ADMIN) return [];

    return [
      {
        text: "Home",
        icon: "🏠",
        link: ROUTES.HOME,
      },
      {
        text: "Playground",
        icon: "🎮",
        link: ROUTES.PLAYGROUND,
      },
      {
        text: "Exercícios",
        icon: "🧩",
        link: ROUTES.EXERCISES,
      },
    ].map((item) => ({
      ...item,
      isActive: !!matchPath(item.link, location.pathname),
    }));
  }, [loggedUser, location.pathname]);

  return { headerMenuItems };
};
