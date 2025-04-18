import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useParams, usePathname } from "next/navigation";

interface ISidebarMenuItem {
  title: string;
  icon: string;
  link: string;
  basePath: string;
  isActive?: boolean;
}

export const useGetSidebarMenuItems = () => {
  const { loggedUser } = useAuth();
  const params = useParams<{ classroomId: string }>();
  const path = usePathname();

  const sidebarMenuItems = useMemo<ISidebarMenuItem[]>(() => {
    let result: ISidebarMenuItem[] = [];
    if (loggedUser?.role === 3) {
      result = [
        {
          title: "Home",
          icon: "🏠",
          link: "/home",
          basePath: "home",
        },
        {
          title: "Usuários",
          icon: "👤",
          link: "/users",
          basePath: "users",
        },
      ];
    } else {
      result = [
        // {
        //   title: "Dashboard",
        //   icon: "📊",
        //   path: "/classroom/dsadsad/dashboard",
        //   basePath: "dashboard",
        // },
        {
          title: "Listas",
          icon: "📝",
          link: `/classroom/${params?.classroomId}/lists`,
          basePath: "lists",
        },
        {
          title: "Provas",
          icon: "📚",
          link: "/classroom/dsadsad/tests",
          basePath: "tests",
        },
        {
          title: "Participantes",
          icon: "👨‍🎓",
          link: `/classroom/${params?.classroomId}/people`,
          basePath: "people",
        },
      ];
    }
    return result.map((item) => ({
      ...item,
      isActive: path.includes(item.basePath),
    }));
  }, [loggedUser, path, params]);

  return { sidebarMenuItems: sidebarMenuItems };
};
