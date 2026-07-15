import { Alert } from "@/components/ui/feedback/Alert";
import {
  ChestIllustration,
  EmptyPrimaryButton,
  EmptyState,
  ScrollIllustration,
} from "@/components/ui/feedback/EmptyState";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { ExerciseCard } from "@/modules/exercise/components/ExerciseCard";
import { useFetchListOfExercises } from "@/modules/list/hooks/useFetchListOfExercises";
import { IFetchListsByClassromUuidResponse } from "@/modules/list/hooks/useFetchListsByClassromUuid";
import { RoleUser } from "@/modules/user/userTypets";
import { getRange } from "@/utils/getRange";
import { Plus } from "lucide-react";
import { memo } from "react";

interface ClassroomListsTableRowAccordionContentProps {
  totalExercises: number;
  list: IFetchListsByClassromUuidResponse;
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
            {/* <Alert.Root>
            <Alert.Title>Não há exercícios cadastrados nesta lista</Alert.Title>
            {role === RoleUser.TEACHER && (
              <Alert.Description className="text-sm text-muted-foreground">
                Você pode adicionar exercícios clicando no botão de adicionar e
                remover exercícios.
              </Alert.Description>
            )}
          </Alert.Root> */}
            {/* <div>
              <EmptyState
                illustration={<ScrollIllustration size={200} />}
                title="Nenhuma lista criada"
                message="Quando o professor publicar uma lista, ela aparecerá aqui."
                action={
                  <EmptyPrimaryButton>
                    <Plus className="h-4 w-4" /> Criar Lista
                  </EmptyPrimaryButton>
                }
              />
            </div> */}
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
                // action={
                //   onAddExercises && (
                //     <EmptyPrimaryButton onClick={onAddExercises}>
                //       <ListPlus className="h-4 w-4" /> Adicionar exercícios
                //     </EmptyPrimaryButton>
                //   )
                // }
              />
            </div>
          </>
        ) : (
          <>
            {errorExercises && (
              <FeedBackError onTryAgain={refetchListOfExercises} />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full border-none">
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
                  exerciseId={exerciseUuid}
                  listId={list?.id!}
                  classroomId={list?.classroom?.uuid!}
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
