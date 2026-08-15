import {
  ApiErrorState,
  ChestIllustration,
  EmptyState,
} from "@/components/ui/feedback/EmptyState";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { ExerciseCard } from "@/modules/exercise/components/ExerciseCard";
import { useFetchListOfExercises } from "@/modules/list/hooks/useFetchListOfExercises";
import { IFetchListsOfClassromResponse } from "@/modules/list/hooks/useFetchListsByClassromUuid";
import { RoleUser } from "@/modules/user/userTypets";
import { getRange } from "@/utils/getRange";
import { memo } from "react";

interface ClassroomListsTableRowAccordionContentProps {
  totalExercises: number;
  list: IFetchListsOfClassromResponse;
  role: RoleUser;
}

export const ClassroomListsTableRowAccordionContent = memo(
  ({
    role,
    list,
    totalExercises,
  }: ClassroomListsTableRowAccordionContentProps) => {
    const {
      exerciseIdsOfList,
      errorExercises,
      isFetchingExercises,
      refetchListOfExercises,
    } = useFetchListOfExercises({
      classroomId: list?.classroom?.uuid!,
      listId: list?.id!,
    });

    return (
      <div className="p-5 border-t bg-background/50">
        {totalExercises === 0 ? (
          <>
            <div>
              <EmptyState
                size="sm"
                illustration={<ChestIllustration size={140} />}
                title="Nenhum exercício nesta lista"
                message={
                  role === RoleUser.STUDENT
                    ? "Assim que exercícios forem adicionados, eles aparecerão aqui."
                    : "Você pode adicionar exercícios clicando no botão de adicionar e remover exercícios"
                }
              />
            </div>
          </>
        ) : (
          <>
            {errorExercises && (
              <ApiErrorState
                message={
                  errorExercises?.message ||
                  "Ocorreu um erro ao buscar os exercícios desta lista"
                }
                onRetry={refetchListOfExercises}
              />
            )}
            {/* grid gap-4 border-t border-border/60 bg-background/50 p-5 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] */}
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
              {isFetchingExercises &&
                getRange(0, 5).map((index) => (
                  <Skeleton
                    key={`exercise-skeleton-${index}-${list.id}-${list.classroom?.uuid}`}
                    className="w-full h-26 rounded-lg"
                  />
                ))}

              {exerciseIdsOfList?.map((exerciseUuid) => (
                <ExerciseCard
                  key={`exercise-${exerciseUuid}-${list?.id}-${list?.classroom?.uuid}`}
                  exerciseUuId={exerciseUuid}
                  listId={list?.id!}
                  classroomUuId={list?.classroom?.uuid!}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);

ClassroomListsTableRowAccordionContent.displayName =
  "ClassroomListsTableRowAccordionContent";
