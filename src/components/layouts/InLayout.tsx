import { Header } from "@/components/common/Header";
import { SplashScreen } from "@/components/ui/feedback/SplashScreen";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { RoleUser } from "@/modules/user/userTypets";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useFetchPoolingSubmissionsResult } from "@/modules/submission/hooks/useFetchPoolingSubmissionsResult";
import { ApiErrorState } from "@/components/ui/feedback/EmptyState";
import { useFetchMyClassrooms } from "@/modules/classroom/hooks/useFetchMyClassrooms";

export default function InLayoutPage() {
  const { logout } = useLogout();
  const [access_token] = useSessionStorage("access_token");
  const { loggedUser } = useLoggedUser();

  const {
    myClassroomsRecords: classrooms,
    myClassroomsError: errorClassrooms,
    isFetchingMyClassrooms: isLoadingClassrooms,
    refetchMyClassrooms: refetchClassrooms,
  } = useFetchMyClassrooms({
    enabled:
      loggedUser?.role === RoleUser.STUDENT ||
      loggedUser?.role === RoleUser.TEACHER,
  });

  const { fetchMe, errorUser, isErrorUser } = useAuth();

  useFetchPoolingSubmissionsResult();

  useEffect(() => {
    if (loggedUser) return;

    if (!access_token) {
      logout();
      return;
    }
    fetchMe();
  }, [fetchMe, loggedUser, access_token, logout]);

  if (!loggedUser || !classrooms || isLoadingClassrooms) {
    return <SplashScreen />;
  }

  if (isErrorUser) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <ApiErrorState
          message={errorUser?.message || "Ops... Aconteceu um erro inesperado"}
          onRetry={fetchMe}
        />
      </div>
    );
  }

  if (errorClassrooms) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <ApiErrorState
          title="Erro ao carregar suas turmas"
          onRetry={refetchClassrooms}
          message={
            errorClassrooms.message || "Ops... Aconteceu um erro inesperado"
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}

// return <Outlet />;
