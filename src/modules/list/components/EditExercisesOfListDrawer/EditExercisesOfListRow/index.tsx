import { memo } from "react";
import { Table } from "@/components/ui/dataDisplay/Table";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { useGetCachedExerciseRow } from "@/modules/exercise/hooks/useGetCachedExerciseRow";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { TiInfoLargeOutline } from "react-icons/ti";
import { useTriggerExerciseDetailDialog } from "../../../../exercise/components/ExerciseDetailDialog/useTriggerExerciseDetailDialog";

interface EditExercisesOfListRowProps {
  exerciseUuid: string;
  isInList: boolean;
  addExerciseToList: (uuid: string) => void;
  removeExerciseToList: (uuid: string) => void;
}

export const EditExercisesOfListRow = memo(
  ({
    exerciseUuid,
    isInList,
    addExerciseToList,
    removeExerciseToList,
  }: EditExercisesOfListRowProps) => {
    const { cachedExercise: exercise } = useGetCachedExerciseRow(exerciseUuid);
    const { openDialog } = useTriggerExerciseDetailDialog();

    return (
      <Table.Row>
        <Table.Data>
          <p
            role="button"
            className="line-clamp-1 w-fit cursor-pointer hover:underline"
            onClick={() => openDialog(exerciseUuid)}
          >
            {exercise?.title}
          </p>
        </Table.Data>

        <Table.Data>
          <p className="line-clamp-1">{exercise?.category?.name}</p>
        </Table.Data>

        <Table.Data>
          <div className="flex items-center justify-end gap-2">
            {isInList ? (
              <Tooltip textContent="Remover Exercício">
                <IconButton
                  variantStyle="warning"
                  onClick={() => removeExerciseToList(exerciseUuid)}
                  icon={<MdOutlineDoubleArrow className="rotate-180" />}
                />
              </Tooltip>
            ) : (
              <Tooltip textContent="Adicionar Exercício">
                <IconButton
                  onClick={() => addExerciseToList(exerciseUuid)}
                  icon={<MdOutlineDoubleArrow />}
                />
              </Tooltip>
            )}

            <Tooltip textContent="Ver detalhes">
              <IconButton
                variantStyle="dark-ghost"
                icon={<TiInfoLargeOutline />}
                onClick={() => openDialog(exerciseUuid)}
              />
            </Tooltip>
          </div>
        </Table.Data>
      </Table.Row>
    );
  },
);

EditExercisesOfListRow.displayName = "EditExercisesOfListRow";
