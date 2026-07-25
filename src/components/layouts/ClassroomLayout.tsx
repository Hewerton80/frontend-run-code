import { Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { useFetchClassroomById } from "@/modules/classroom/hooks/useFetchClassroomById";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ApiErrorState } from "../ui/feedback/EmptyState";
import { SideBarMembers } from "@/modules/classroom/components/SidebarMembers";
import { cn } from "@/utils/cn";
import { SidebarClassrooms } from "@/modules/classroom/components/SidebarClassrooms";

export default function ClassroomLayoutPage() {
  const params = useParams<{ classroomId: string }>();

  const { classroomError, isFetchingClassroom, refetchClassroom } =
    useFetchClassroomById(params?.classroomId);

  const handledChildren = useMemo(() => {
    if (classroomError) {
      return (
        <ApiErrorState
          message={classroomError?.message || "An error occurred"}
          onRetry={refetchClassroom}
        />
      );
    }
    if (isFetchingClassroom) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner size={64} />
        </div>
      );
    }
    return <Outlet />;
  }, [classroomError, refetchClassroom, isFetchingClassroom]);

  return (
    <div
      className={cn(
        "h-[calc(100vh-var(--spacing-top-header))] w-full overflow-hidden",
        "grid grid-cols-[auto_1fr_auto]",
      )}
    >
      <SidebarClassrooms />
      <main
        className={cn(
          "h-full overflow-auto bg-background min-w-0 px-4 py-6 md:px-8",
        )}
      >
        {handledChildren}
      </main>
      <SideBarMembers />
    </div>
  );
}
