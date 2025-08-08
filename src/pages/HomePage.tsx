import { HomeHeader } from "@/components/common/HomeHeader/HomeHeader";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { ClassroomsHome } from "@/modules/classroom/components/ClassroomsHome";
import { SuperAdminHome } from "@/modules/user/components/SuperAdminHome";
import { RoleUser } from "@/modules/user/userTypets";

export default function HomePage() {
  const { loggedUser } = useAuth();

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
