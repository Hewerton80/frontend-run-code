import { Outlet } from "react-router-dom";
import { SideBarTamplateWrapper } from "@/components/templates/SideBarTamplateWrapper";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export default function ClassroomLayoutPage() {
  const params = useParams<{ classroomId: string }>();

  const { errorClassroom, isLoadingClassroom, refetchClassroom } =
    useGetClassroomById(params?.classroomId);

  const handledChildren = useMemo(() => {
    if (errorClassroom) {
      return <FeedBackError onTryAgain={refetchClassroom} />;
    }
    if (isLoadingClassroom) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner size={64} />
        </div>
      );
    }
    return <Outlet />;
  }, [errorClassroom, refetchClassroom, isLoadingClassroom]);

  return <SideBarTamplateWrapper>{handledChildren}</SideBarTamplateWrapper>;
}
