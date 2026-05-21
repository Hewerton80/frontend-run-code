import { useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useLocation, useParams } from "react-router-dom";
import { RoleUser } from "@/modules/user/userTypets";
import { ROUTES } from "@/routes/routes";

interface ISidebarMenuItem {
  title: string;
  icon: string;
  link: string;
  basePath: string;
  isActive?: boolean;
}

export const useGetSidebarMenuItems = () => {
  const { loggedUser } = useLoggedUser();
  const params = useParams<{ classroomId: string }>();
  const location = useLocation();

  const sidebarMenuItems = useMemo<ISidebarMenuItem[]>(() => {
    let result: ISidebarMenuItem[] = [];
    if (loggedUser?.role === RoleUser.SUPER_ADMIN) {
      result = [
        {
          title: "Home",
          icon: "🏠",
          link: ROUTES.HOME,
          basePath: "home",
        },
        {
          title: "Usuários",
          icon: "👤",
          link: ROUTES.USERS,
          basePath: "users",
        },
        {
          title: "Turmas",
          icon: "🏫",
          link: ROUTES.CLASSROOMS,
          basePath: "classrooms",
        },
        {
          title: "Exercícios",
          icon: "🧩",
          link: ROUTES.EXERCISES,
          basePath: "exercises",
        },
        {
          title: "Listas",
          icon: "📝",
          link: ROUTES.LISTS,
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
          link: ROUTES.CLASSROOM_LISTS(params?.classroomId!),
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
          link: ROUTES.CLASSROOM_USERS(params?.classroomId!),
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
