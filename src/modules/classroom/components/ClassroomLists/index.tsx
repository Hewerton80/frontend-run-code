import { useFetchClassroomById } from "../../hooks/useFetchClassroomById";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { ClassroomListsTable } from "@/modules/list/components/ClassroomListsTable";
import { useParams } from "react-router-dom";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();

  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useFetchClassroomById(params?.classroomId);

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          isLoading={isLoadingClassroom}
          items={[
            { label: "🏠 Home", href: "/home" },
            { label: classroom?.name || "-" },
            { label: "📝 Listas" },
          ]}
        />

        <ClassroomListsTable
          isLoading={isLoadingClassroom}
          error={errorClassroom ? "Erro ao carregar listas" : undefined}
          onTryAgainIfError={refetchClassroom}
        />
      </div>
    </>
  );
}
