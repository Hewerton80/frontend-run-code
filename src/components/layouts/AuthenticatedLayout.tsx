import { useFetchMyClassrooms } from "@/modules/classroom/hooks/useFetchMyClassrooms";
import { Outlet } from "react-router-dom";
import { ApiErrorState } from "../ui/feedback/EmptyState";
import { SplashScreen } from "../ui/feedback/SplashScreen";

export default function AuthenticatedLayout() {
  const {
    myClassroomsRecords: classrooms,
    myClassroomsError: errorClassrooms,
    isFetchingMyClassrooms: isLoadingClassrooms,
    refetchMyClassrooms: refetchClassrooms,
  } = useFetchMyClassrooms();

  if (errorClassrooms) {
    return (
      <ApiErrorState
        title="Erro ao carregar suas turmas"
        onRetry={refetchClassrooms}
        message={
          errorClassrooms.message || "Ops... Aconteceu um erro inesperado"
        }
      />
    );
  }

  if (!classrooms || isLoadingClassrooms) {
    return <SplashScreen />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
