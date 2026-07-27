import { ExerciseDescription } from "./ExerciseDescription";
import { IDEExercise } from "./IDEExercise";
import { Suspense, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useParams } from "react-router-dom";
import { Resizable } from "@/components/ui/dataDisplay/Resizable";
import { useFetchExerciseByUuId } from "../../hooks/useFetchExerciseByUuId";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { useGetCachedClassromById } from "@/modules/classroom/hooks/useGetCachedClassromById";
import { ExerciseForm } from "../ExerciseFormDrawer";
import { SolveExerciseEnvirolmentActions } from "./SolveExerciseEnvirolmentActions";
import { cn } from "@/utils/cn";
import { Trophy, Zap } from "lucide-react";
import { ExerciseDifficultyStars } from "../ExerciseDifficultyStars";
import { Separator } from "@/components/ui/separator";
import { ApiErrorState } from "@/components/ui/feedback/EmptyState";
import { TestCasesResultsDisplay } from "./TestCasesResultsDisplay";
import { useSidebarMembers } from "@/modules/classroom/components/SidebarMembers/useSidebarMembers";
import {
  SubmissionStatus,
  XP_BY_DIFFICULTY,
} from "@/modules/submission/submissionType";

export const SolveExerciseEnvirolment = () => {
  const { setShowSidebarMembers } = useSidebarMembers();

  const params = useParams<{
    classroomId?: string;
    listId?: string;
    exerciseId: string;
  }>();

  const { cachedClassroom: classroom } = useGetCachedClassromById(
    params?.classroomId!,
  );
  // TODO adicionar um todo para saber de qual url ele veio

  const { isFetchingExercise, exercise, exerciseError, refetchExercise } =
    useFetchExerciseByUuId({
      exerciseUuId: params?.exerciseId || "",
      classroomUuId: params?.classroomId,
      listId: params?.listId,
    });

  const done = useMemo(
    () => exercise?.submissionStats?.status === SubmissionStatus.ACCEPTED,
    [exercise?.submissionStats?.status],
  );

  useEffect(() => {
    setShowSidebarMembers(false);
  }, [setShowSidebarMembers]);

  const skeleton = (
    <div className="p-4">
      <Skeleton className="size-full min-h-117" />
    </div>
  );

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
      { label: "🧩 Exercícios ", href: "/exercises" },
      { label: exercise?.title || "" },
    ];
  };

  if (exerciseError) {
    return (
      <ApiErrorState
        message={exerciseError?.message || "Erro ao carregar exercício"}
        onRetry={refetchExercise}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <Breadcrumbs
          isLoading={isFetchingExercise}
          items={getBreadcrumbsItems()}
        />
        {/* TODO colocar de onde ele esta vindo (from) para porder voltar  */}
        <div className="flex items-center">
          <BackLink
            to={
              params?.classroomId && params?.listId
                ? `/classroom/${classroom?.uuid}/lists`
                : "/exercises"
            }
          >
            Voltar para listas da turma
          </BackLink>
          <div className="ml-auto">
            <SolveExerciseEnvirolmentActions exercise={exercise} />
          </div>
        </div>
        {/* <div className="bg-red-500  w-full h-400"></div> */}

        <div
          className={cn(
            "relative flex flex-col overflow-hidden rounded-4xl p-6",
            "size-full min-h-117 border border-white/10 gap-4 card-frame-gray",
          )}
        >
          <div className="flex items-center justify-between">
            <h1
              className={cn(
                "line-clamp-1 text-xl font-black tracking-tight",
                "text-foreground",
              )}
            >
              {exercise?.title}
            </h1>
            <div className="flex items-center gap-4">
              {done && (
                <span className="inline-flex items-center gap-1 font-bold text-warning/90">
                  <Trophy className="size-4" />
                  Conquistado
                </span>
              )}
              <ExerciseDifficultyStars count={exercise?.difficulty || 1} />
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-bold text-primary leading-0",
                  done && "line-through",
                )}
              >
                <Zap className="size-4" /> +
                {XP_BY_DIFFICULTY[exercise?.difficulty || 1]} XP
              </span>
            </div>
          </div>
          <Separator orientation="horizontal" className="h-1" />
          <div className="flex flex-col gap-4">
            <Resizable.Group>
              <Resizable.Panel
                defaultSize={20}
                minSize={15}
                className="h-full w-full flex-1/2"
              >
                {isFetchingExercise ? (
                  skeleton
                ) : (
                  <Suspense fallback={skeleton}>
                    <ExerciseDescription exercise={exercise!} />
                  </Suspense>
                )}
              </Resizable.Panel>
              <Resizable.Handle className="mx-4" withHandle />
              <Resizable.Panel
                defaultSize={20}
                minSize={15}
                className="flex flex-1/2 w-full flex-col h-full gap-4"
              >
                {isFetchingExercise ? (
                  skeleton
                ) : (
                  <Suspense fallback={skeleton}>
                    <IDEExercise exercise={exercise!} />
                  </Suspense>
                )}
              </Resizable.Panel>
            </Resizable.Group>
            <TestCasesResultsDisplay exerciseUuId={params?.exerciseId!} />
          </div>
        </div>
      </div>
      <ExerciseForm.Drawer />
    </>
  );
};
