import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { memo } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ExerciseForm } from "../../ExerciseFormDrawer";
import { FaPen } from "react-icons/fa";
interface SolveExerciseEnvirolmentActionsProps {
  exercise?: IExercise;
}

export const SolveExerciseEnvirolmentActions = memo(
  ({ exercise }: SolveExerciseEnvirolmentActionsProps) => {
    const { loggedUser } = useLoggedUser();

    if (!exercise || loggedUser?.uuid !== exercise?.author?.uuid) {
      return <></>;
    }

    return (
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <IconButton
            variantStyle="dark-ghost"
            icon={<BsThreeDotsVertical className="text-muted-foreground" />}
          />
        </Dropdown.Trigger>
        <Dropdown.Content>
          <ExerciseForm.Trigger
            exerciseUuid={exercise?.uuid}
            key="edit-exercise"
          >
            <Dropdown.Item className="gap-2">
              <FaPen />
              Editar
            </Dropdown.Item>
          </ExerciseForm.Trigger>
        </Dropdown.Content>
      </Dropdown.Root>
    );
  },
);

SolveExerciseEnvirolmentActions.displayName = "SolveExerciseEnvirolmentActions";
