import { ReactNode, useMemo } from "react";
import { useAuth } from "./useAuth";
import { usePathname } from "next/navigation";
interface IHeaderMenu {
  text: string;
  icon: ReactNode;
  link: string;
  isActive?: boolean;
}
export const useGetHeaderMenuItems = () => {
  const { loggedUser } = useAuth();
  const pathName = usePathname();

  const headerMenuItems = useMemo<IHeaderMenu[]>(() => {
    if (loggedUser?.role === 3) return [];

    return [
      {
        text: "Home",
        icon: "🏠",
        link: "/home",
      },
      {
        text: "Playground",
        icon: "🎮",
        link: "/playground",
      },
      {
        text: "exercícios",
        icon: "🧩",
        link: "/exercises",
      },
    ].map((item) => ({
      ...item,
      isActive: item.link === pathName,
    }));
  }, [loggedUser, pathName]);

  return { headerMenuItems };
};
