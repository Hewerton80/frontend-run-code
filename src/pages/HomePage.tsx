import { HomeHeader } from "@/components/common/HomeHeader/HomeHeader";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { ClassroomsHome } from "@/modules/classroom/components/ClassroomsHome";
import { SuperAdminHome } from "@/modules/user/components/SuperAdminHome";
import { RoleUser } from "@/modules/user/userTypets";

// TODO mifrar todos os selects e combobox
// TODO migrar todas as tabelas
// TODO Mudar layout da tela de login

export default function HomePage() {
  const { loggedUser } = useLoggedUser();

  return (
    <div className="flex flex-col w-full">
      <HomeHeader />
      <div className="flex flex-col gap-4 w-full p-8">
        {loggedUser?.role === RoleUser.SUPER_ADMIN ? (
          <SuperAdminHome />
        ) : (
          <ClassroomsHome />
        )}
      </div>
    </div>
  );
}
