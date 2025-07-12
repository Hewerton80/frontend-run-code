"use client";
import { SideBarTamplateWrapper } from "@/components/templates/SideBarTamplateWrapper";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    return <>{children}</>;
  }, [errorClassroom, refetchClassroom, isLoadingClassroom, children]);

  return <SideBarTamplateWrapper>{handledChildren}</SideBarTamplateWrapper>;
}
