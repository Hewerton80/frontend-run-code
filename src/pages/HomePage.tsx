import { HomeHeader } from "@/components/common/HomeHeader/HomeHeader";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { ClassroomsHome } from "@/modules/classroom/components/ClassroomsHome";
import { SuperAdminHome } from "@/modules/user/components/SuperAdminHome";
import { RoleUser } from "@/modules/user/userTypets";

// TODO Mudar layout da tela de login
// TODO adicionar refresh token
// TODO mudar todas as tipaggens para que fiquem iguais aos retornos da API
// TODO mudar tudo para usar register ao inves de Controller

export default function HomePage() {
  const { loggedUser } = useLoggedUser();

  return (
    <main className="flex flex-col w-full px-6 pb-6">
      <HomeHeader />
      <div className="flex flex-col gap-4 w-full pt-6">
        {loggedUser?.role === RoleUser.SUPER_ADMIN ? (
          <SuperAdminHome />
        ) : (
          <ClassroomsHome />
        )}
      </div>
    </main>
  );
}
