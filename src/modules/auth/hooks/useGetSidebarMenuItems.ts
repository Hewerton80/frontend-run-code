import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useLocation, useParams } from "react-router-dom";
import { RoleUser } from "@/modules/user/userTypets";

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
  const location = useLocation();

  const sidebarMenuItems = useMemo<ISidebarMenuItem[]>(() => {
    let result: ISidebarMenuItem[] = [];
    if (loggedUser?.role === RoleUser.SUPER_ADMIN) {
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
        {
          title: "Turmas",
          icon: "🏫",
          link: "/classrooms",
          basePath: "classrooms",
        },
        {
          title: "Exercícios",
          icon: "🧩",
          link: "/exercises",
          basePath: "exercises",
        },
        {
          title: "Listas",
          icon: "📝",
          link: "/lists",
          basePath: "lists",
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
        // {
        //   title: "Provas",
        //   icon: "📚",
        //   link: "/classroom/dsadsad/tests",
        //   basePath: "tests",
        // },
        {
          title: "Participantes",
          icon: "👨‍🎓",
          link: `/classroom/${params?.classroomId}/users`,
          basePath: "users",
        },
      ];
    }
    return result.map((item) => ({
      ...item,
      isActive: location.pathname.includes(item.basePath),
    }));
  }, [loggedUser, location.pathname, params]);

  return { sidebarMenuItems: sidebarMenuItems };
};
