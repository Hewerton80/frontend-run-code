import { Dialog } from "@/components/ui/overlay/Dialog";
import { useExerciseDetailDialog } from "./useExerciseDetailDialog";
import { useTriggerExerciseDetailDialog } from "./useTriggerExerciseDetailDialog";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { ExerciseDescription } from "@/modules/exercise/components/SolveExerciseEnvirolment/ExerciseDescription";
import { forwardRef, memo, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

const ExerciseDetailDialog = () => {
  const { showDialog, exercise, isLoading, error, refetch, handleClose } =
    useExerciseDetailDialog();

  return (
    <Dialog.Root
      open={showDialog}
      onOpenChange={(value) => !value && handleClose()}
    >
      <Dialog.Content size="xl">
        <Dialog.Header>
          <Dialog.Title>Detalhes do Exercício</Dialog.Title>
        </Dialog.Header>

        {isLoading && (
          <div className="flex items-center justify-center w-full h-80">
            <Spinner size={64} />
          </div>
        )}

        {error && !isLoading && (
          <div className="flex items-center justify-center w-full h-80">
            <FeedBackError onTryAgain={refetch} />
          </div>
        )}

        {!isLoading && !error && exercise && (
          <div className="flex flex-col max-h-[calc(100vh-112px)] overflow-y-auto">
            <ExerciseDescription orientation="horizontal" exercise={exercise} />
            <div className="flex justify-end mt-4">
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground mb-1">Autor(a):</p>
                <GroupedUserInfo user={exercise?.author!} />
              </div>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

interface ExerciseDetailTriggerButtonProps {
  children?: ReactNode;
  exerciseId: string;
}

const ExerciseDetailTriggerButton = (
  { children, exerciseId }: ExerciseDetailTriggerButtonProps,
  ref?: any,
) => {
  const { openDialog } = useTriggerExerciseDetailDialog();

  const Comp = Slot;

  return (
    <Comp
      ref={ref}
      onClick={() => openDialog(exerciseId)}
      aria-label="Ver detalhes do exercício"
    >
      {children}
    </Comp>
  );
};

const ExerciseDetail = {
  Dialog: memo(ExerciseDetailDialog),
  TriggerButton: memo(forwardRef(ExerciseDetailTriggerButton)),
};

export { ExerciseDetail };

ExerciseDetail.Dialog.displayName = "ExerciseDetailDialog";
ExerciseDetail.TriggerButton.displayName = "ExerciseDetailTriggerButton";
