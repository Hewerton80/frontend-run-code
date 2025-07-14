import { ReactNode, useMemo } from "react";
import { useAuth } from "./useAuth";
import { useLocation, matchPath } from "react-router-dom";
interface IHeaderMenu {
  text: string;
  icon: ReactNode;
  link: string;
  isActive?: boolean;
}
export const useGetHeaderMenuItems = () => {
  const { loggedUser } = useAuth();
  const location = useLocation();

  const headerMenuItems = useMemo<IHeaderMenu[]>(() => {
    if (loggedUser?.role === 3) return [];

    return [
      {
        text: "Home",
        icon: "🏠",
        link: "/in/home",
      },
      {
        text: "Playground",
        icon: "🎮",
        link: "/in/playground",
      },
      {
        text: "exercícios",
        icon: "🧩",
        link: "/in/exercises",
      },
    ].map((item) => ({
      ...item,
      isActive: !!matchPath(item.link, location.pathname),
    }));
  }, [loggedUser, location.pathname]);

  return { headerMenuItems };
};
