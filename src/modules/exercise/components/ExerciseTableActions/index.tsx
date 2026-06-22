import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { ROUTES } from "@/routes/routes";
import { BsThreeDots } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IExercise } from "../../exerciseTypes";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { FaCode } from "react-icons/fa";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { JSX, useMemo } from "react";

interface ExerciseTableActionsProps {
  exercise: IExercise;
}

export const ExerciseTableActions = ({
  exercise,
}: ExerciseTableActionsProps) => {
  const { loggedUser } = useLoggedUser();

  const dropdownItems = useMemo(() => {
    const items: JSX.Element[] = [];
    if (loggedUser?.uuid === exercise.author?.uuid) {
      items.push(
        <Dropdown.Item className="gap-2" asChild>
          <Link to={ROUTES.EXERCISES_EDIT(exercise.uuid)}>
            <FaPen />
            Editar
          </Link>
        </Dropdown.Item>,
      );
    }
    return items;
  }, [loggedUser, exercise.author, exercise.uuid]);

  return (
    <div className="flex items-center gap-0.5">
      <Tooltip textContent="Resolver exercício">
        <Link to={ROUTES.EXERCISE_DETAIL(exercise.uuid)}>
          <IconButton
            variantStyle="dark-ghost"
            icon={<FaCode className="text-info" />}
          />
        </Link>
      </Tooltip>

      {dropdownItems.length > 0 && (
        <>
          <span className="text-border">|</span>
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <IconButton variantStyle="dark-ghost" icon={<BsThreeDots />} />
            </Dropdown.Trigger>

            <Dropdown.Content>{dropdownItems}</Dropdown.Content>
          </Dropdown.Root>
        </>
      )}
    </div>
  );
};
