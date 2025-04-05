"use client";
import { IProblem } from "../../problemTypes";
import { ProblemDescription } from "./ProblemDescription";
import { IDEProblem } from "./IDEProblem";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { useParams } from "next/navigation";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";

interface SolveProblemEnvirolmentProps {
  problem?: IProblem;
  isLoading?: boolean;
}

export const SolveProblemEnvirolment = ({
  isLoading,
  problem,
}: SolveProblemEnvirolmentProps) => {
  const params = useParams<{
    classroomId?: string;
    listId?: string;
    problemId: string;
  }>();

  const { classroom, isLoadingClassroom } = useGetClassroomById(
    params?.classroomId as string
  );

  const skeleton = <Skeleton className="size-full" />;

  const isLoadingBredcrumbs = isLoading || isLoadingClassroom;

  const getBreadcrumbsItems = () => {
    const classroomId = params?.classroomId;
    const listId = params?.listId;

    if (classroomId && listId) {
      return [
        { label: "🏠 Home", href: "/" },
        {
          label: classroom?.name || "-",
          href: `/classroom/${classroomId}/lists`,
        },
        { label: problem?.title || "" },
      ];
    }
    return [
      { label: "🧩 Problemas ", href: "/problems" },
      { label: problem?.title || "" },
    ];
  };

  return (
    <>
      <div className="flex flex-col size-full gap-4 px-4 pt-6 pb-4">
        <Breadcrumbs
          isLoading={isLoadingBredcrumbs}
          items={getBreadcrumbsItems()}
        />
        <div className="grid grid-cols-12 gap-4 size-full min-h-[468px]">
          <div className="col-span-4 h-full">
            {isLoading ? (
              skeleton
            ) : (
              <Suspense fallback={skeleton}>
                <ProblemDescription problem={problem!} />
              </Suspense>
            )}
          </div>
          <div className="flex flex-col col-span-8 h-full gap-4">
            {isLoading ? (
              skeleton
            ) : (
              <Suspense fallback={skeleton}>
                <IDEProblem problem={problem!} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
