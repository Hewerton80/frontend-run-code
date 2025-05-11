"use client";
import { ExerciseDescription } from "./ExerciseDescription";
import { IDEExercise } from "./IDEExercise";
import { Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useParams } from "next/navigation";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { twMerge } from "tailwind-merge";
import { Resizable } from "@/components/ui/dataDisplay/Resizable";
import { useGetExercise } from "../../hooks/useGetExercise";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { BackLink } from "@/components/ui/navigation/BackLink";

export const SolveExerciseEnvirolment = () => {
  const params = useParams<{
    classroomId?: string;
    listId?: string;
    exerciseId: string;
  }>();

  const { classroom, isLoadingClassroom } = useGetClassroomById(
    params?.classroomId as string
  );

  const { isLoadingExercise, exercise, exerciseError, refetchExercise } =
    useGetExercise({
      exerciseId: params?.exerciseId || "",
      classroomId: params?.classroomId,
      listId: params?.listId,
    });

  useEffect(() => {
    refetchExercise();
  }, [refetchExercise]);

  const skeleton = (
    <div className="p-4">
      <Skeleton className="size-full min-h-[468px]" />
    </div>
  );

  const isLoading = isLoadingClassroom || isLoadingExercise;

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
        { label: exercise?.title || "" },
      ];
    }
    return [
      { label: "🧩 Exerciseas ", href: "/exercises" },
      { label: exercise?.title || "" },
    ];
  };

  if (exerciseError) {
    return <FeedBackError onTryAgain={refetchExercise} />;
  }

  return (
    <>
      <div className="flex flex-col size-full gap-4 px-4 pt-6 pb-4 ">
        <Breadcrumbs isLoading={isLoading} items={getBreadcrumbsItems()} />
        <BackLink href={`/classroom/${classroom?.uuid}/lists`}>
          Voltar para listas da turma
        </BackLink>
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
                <div className="p-4">
                  <ExerciseDescription exercise={exercise!} />
                </div>
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
                <IDEExercise exercise={exercise!} />
              </Suspense>
            )}
          </Resizable.Panel>
        </Resizable.Group>
      </div>
    </>
  );
};
