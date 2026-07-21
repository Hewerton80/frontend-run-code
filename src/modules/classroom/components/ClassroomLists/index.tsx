import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { ClassroomListsTable } from "@/modules/list/components/ClassroomListsTable";
import { useParams } from "react-router-dom";
import { useGetCachedClassromById } from "../../hooks/useGetCachedClassromById";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();

  const { cachedClassroom } = useGetCachedClassromById(params?.classroomId!);

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <Breadcrumbs
          items={[
            { label: "🏠 Home", href: "/home" },
            { label: cachedClassroom?.name || "-" },
            { label: "📝 Listas" },
          ]}
        />

        <ClassroomListsTable />
      </div>
    </>
  );
}
