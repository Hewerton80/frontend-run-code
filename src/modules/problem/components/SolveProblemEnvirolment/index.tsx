"use client";
import { IProblem } from "../../problemTypes";
import { ProblemDescription } from "./ProblemDescription";
import { IDEProblem } from "./IDEProblem";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { useParams } from "next/navigation";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { twMerge } from "tailwind-merge";
import { Resizable } from "@/components/ui/dataDisplay/Resizable";

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
      <div className="flex flex-col size-full gap-4 px-4 pt-6 pb-4 ">
        <Breadcrumbs
          isLoading={isLoadingBredcrumbs}
          items={getBreadcrumbsItems()}
        />
        <Resizable.Group
          direction="horizontal"
          className={twMerge(
            "flex size-full min-h-[468px] rounded-lg overflow-hidden border",
            "border-l-3 border-l-info rounded-l-none"
          )}
        >
          <Resizable.Panel
            defaultSize={4}
            minSize={15}
            className="h-full w-full flex-1/4"
          >
            {isLoading ? (
              skeleton
            ) : (
              <Suspense fallback={skeleton}>
                <ProblemDescription problem={problem!} />
              </Suspense>
            )}
          </Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel
            defaultSize={6}
            minSize={15}
            className="flex flex-3/4 w-full flex-col col-span-8 h-full gap-4"
          >
            {isLoading ? (
              skeleton
            ) : (
              <Suspense fallback={skeleton}>
                <IDEProblem problem={problem!} />
              </Suspense>
            )}
          </Resizable.Panel>
        </Resizable.Group>
      </div>
    </>
  );
};
