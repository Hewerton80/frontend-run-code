import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { ROUTES } from "@/routes/routes";
import { BsThreeDots } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IExercise } from "../../exerciseTypes";

interface ExerciseTableActionsProps {
  exercise: IExercise;
}

export const ExerciseTableActions = ({
  exercise,
}: ExerciseTableActionsProps) => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <IconButton variantStyle="dark-ghost" icon={<BsThreeDots />} />
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item className="gap-2" asChild>
          <Link to={ROUTES.EXERCISE_DETAIL(exercise.uuid)}>
            <FaEye />
            Visualizar
          </Link>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
