import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { ClassroomListsTable } from "@/modules/list/components/ClassroomListsTable";
import { useParams } from "react-router-dom";
import { useGetCachedClassromById } from "../../hooks/useGetCachedClassromById";
import { useSidebarMembers } from "../SidebarMembers/useSidebarMembers";
import { useEffect } from "react";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();

  const { cachedClassroom } = useGetCachedClassromById(params?.classroomId!);
  const { setShowSidebarMembers } = useSidebarMembers();

  useEffect(() => {
    setShowSidebarMembers(true);
  }, [setShowSidebarMembers]);

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
