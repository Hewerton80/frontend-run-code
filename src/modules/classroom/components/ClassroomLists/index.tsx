import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { ClassroomListsTable } from "@/modules/list/components/ClassroomListsTable";
import { useParams } from "react-router-dom";
import { useGetCachedClassrom } from "../../hooks/useGetCachedClassrom";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();

  const { cachedClassroom } = useGetCachedClassrom(params?.classroomId!);

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
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
