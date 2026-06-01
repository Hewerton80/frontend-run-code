import { Table } from "@/components/ui/dataDisplay/Table";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { useGetCachedExercise } from "@/modules/exercise/hooks/useGetCachedExercise";
import { DateTime } from "@/utils/dateTime";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { twMerge } from "tailwind-merge";
import { TiInfoLargeOutline } from "react-icons/ti";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { memo } from "react";
import { UpdateExercises } from "../useUpdateExercisesList";

interface IUpdateExercisesListAvailableRowProps {
  exerciseUuid: string;
  addExerciseToList: (uuid: string) => void;
  openExerciseDetailsDialog: (uuid: string) => void;
  verifyIfExerciseAlreadyExistsInCurrentList: (
    uuid: string,
  ) => UpdateExercises | undefined;
}

export const UpdateExercisesListAvailableRow = memo(
  ({
    exerciseUuid,
    addExerciseToList,
    openExerciseDetailsDialog,
    verifyIfExerciseAlreadyExistsInCurrentList,
  }: IUpdateExercisesListAvailableRowProps) => {
    const { cachedExercise: exercise } = useGetCachedExercise(exerciseUuid);

    return (
      <Table.Row>
        <Table.Data>
          <div className="flex flex-col">
            <Tooltip
              textContent={
                <div className="flex flex-col">
                  <span>{exercise?.title}</span>
                  <span className="text-xs text-muted-foreground">
                    Criada em:{" "}
                    {DateTime.format(exercise?.createdAt!, "dd MMM, yyyy")}
                  </span>
                  <div className="flex flex-col mt-2">
                    <p>Autor(a):</p>
                    <GroupedUserInfo user={exercise?.author!} />
                  </div>
                </div>
              }
              align="start"
            >
              <p
                role="button"
                className={twMerge(
                  "line-clamp-1 w-fit cursor-pointer hover:underline",
                )}
                onClick={() => openExerciseDetailsDialog(exerciseUuid)}
              >
                {exercise?.title}
              </p>
            </Tooltip>
          </div>
        </Table.Data>
        <Table.Data>
          <p className="line-clamp-1">{exercise?.category?.name}</p>
        </Table.Data>
        <Table.Data>
          <div className="flex items-center justify-end gap-2">
            {verifyIfExerciseAlreadyExistsInCurrentList(exerciseUuid) ? (
              <Tooltip textContent="Adicionado">
                <span className="flex items-center justify-center size-8 text-success">
                  <FaCheck />
                </span>
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
                onClick={() => openExerciseDetailsDialog(exerciseUuid)}
              />
            </Tooltip>
          </div>
        </Table.Data>
      </Table.Row>
    );
  },
);

UpdateExercisesListAvailableRow.displayName = "UpdateExercisesListAvailableRow";
