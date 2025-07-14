import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useLocation, useParams } from "react-router-dom";

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
    if (loggedUser?.role === 3) {
      result = [
        {
          title: "Home",
          icon: "🏠",
          link: "/in/home",
          basePath: "home",
        },
        {
          title: "Usuários",
          icon: "👤",
          link: "/in/users",
          basePath: "users",
        },
        {
          title: "Turmas",
          icon: "🏫",
          link: "/in/classroom-list",
          basePath: "classroom-list",
        },
        {
          title: "Exerciseas",
          icon: "🧩",
          link: "/in/exercises",
          basePath: "exercises",
        },
        {
          title: "Listas",
          icon: "📝",
          link: "/in/lists",
          basePath: "listExercises",
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
          link: `/in/classroom/${params?.classroomId}/lists`,
          basePath: "lists",
        },
        {
          title: "Provas",
          icon: "📚",
          link: "/in/classroom/dsadsad/tests",
          basePath: "tests",
        },
        {
          title: "Participantes",
          icon: "👨‍🎓",
          link: `/in/classroom/${params?.classroomId}/people`,
          basePath: "people",
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
