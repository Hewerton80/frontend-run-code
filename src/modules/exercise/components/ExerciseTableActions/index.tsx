import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { ROUTES } from "@/routes/routes";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IExercise } from "../../exerciseTypes";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { FaCode } from "react-icons/fa";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { JSX, useMemo } from "react";
import { ExerciseForm } from "../ExerciseFormDrawer";
import { Separator } from "@/components/ui/separator";

interface ExerciseTableActionsProps {
  exercise: IExercise;
}

export const ExerciseTableActions = ({
  exercise,
}: ExerciseTableActionsProps) => {
  const { loggedUser } = useLoggedUser();

  // const editExerciseUrl = useMemo(
  //   () =>
  //     parseUrl(ROUTES.EXERCISES_EDIT(exercise.uuid), {
  //       from: location.pathname,
  //     }),
  //   [exercise.uuid, location.pathname],
  // );

  const dropdownItems = useMemo(() => {
    const items: JSX.Element[] = [];
    if (loggedUser?.uuid === exercise.author?.uuid) {
      items.push(
        <ExerciseForm.Trigger exerciseUuid={exercise.uuid} key="edit-exercise">
          <Dropdown.Item className="gap-2">
            {/* <Link to={editExerciseUrl}> */}
            <FaPen />
            Editar
            {/* </Link> */}
          </Dropdown.Item>
        </ExerciseForm.Trigger>,
      );
    }
    return items;
  }, [loggedUser, exercise]);

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
          <Separator orientation="vertical" className="h-5 my-auto" />
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <IconButton
                variantStyle="dark-ghost"
                icon={<BsThreeDotsVertical className="text-muted-foreground" />}
              />
            </Dropdown.Trigger>

            <Dropdown.Content>{dropdownItems}</Dropdown.Content>
          </Dropdown.Root>
        </>
      )}
    </div>
  );
};
