"use client";
import { ProblemDescription } from "./ProblemDescription";
import { IDEProblem } from "./IDEProblem";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useParams } from "next/navigation";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { twMerge } from "tailwind-merge";
import { Resizable } from "@/components/ui/dataDisplay/Resizable";
import { useGetProblem } from "../../hooks/useGetProblem";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";

export const SolveProblemEnvirolment = () => {
  const params = useParams<{
    classroomId?: string;
    listId?: string;
    problemId: string;
  }>();

  const { classroom, isLoadingClassroom } = useGetClassroomById(
    params?.classroomId as string
  );

  const { isLoadingProblem, problem, problemError, refetchProblem } =
    useGetProblem({
      problemId: params?.problemId || "",
      classroomId: params?.classroomId,
      listId: params?.listId,
    });

  const skeleton = (
    <div className="p-4">
      <Skeleton className="size-full min-h-[468px]" />
    </div>
  );

  const isLoading = isLoadingClassroom || isLoadingProblem;

  const getBreadcrumbsItems = () => {
    const classroomId = params?.classroomId;
    const listId = params?.listId;

    if (classroomId && listId) {
      return [
        { label: "🏠 Home", href: "/home" },
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

  if (problemError) {
    return <FeedBackError onTryAgain={refetchProblem} />;
  }

  return (
    <>
      <div className="flex flex-col size-full gap-4 px-4 pt-6 pb-4 ">
        <Breadcrumbs isLoading={isLoading} items={getBreadcrumbsItems()} />
        <Resizable.Group
          direction="horizontal"
          className={twMerge(
            "flex size-full min-h-[468px] rounded-lg overflow-hidden border",
            "border-l-3 border-l-info rounded-l-none"
          )}
        >
          <Resizable.Panel
            defaultSize={20}
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
            defaultSize={30}
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
