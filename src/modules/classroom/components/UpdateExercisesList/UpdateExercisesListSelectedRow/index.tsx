import { Table } from "@/components/ui/dataDisplay/Table";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { useGetCachedExerciseRow } from "@/modules/exercise/hooks/useGetCachedExerciseRow";
import { DateTime } from "@/utils/dateTime";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { twMerge } from "tailwind-merge";
import { TiInfoLargeOutline } from "react-icons/ti";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { CiUndo } from "react-icons/ci";
import { memo } from "react";

interface IUpdateExercisesListSelectedRowProps {
  exerciseUuid: string;
  removed?: boolean;
  removeExerciseToList: (uuid: string) => void;
  unDoRemoveExerciseToList: (uuid: string) => void;
  openExerciseDetailsDialog: (uuid: string) => void;
}

export const UpdateExercisesListSelectedRow = memo(
  ({
    exerciseUuid,
    removed,
    removeExerciseToList,
    unDoRemoveExerciseToList,
    openExerciseDetailsDialog,
  }: IUpdateExercisesListSelectedRowProps) => {
    const { cachedExercise: exercise } = useGetCachedExerciseRow(exerciseUuid);

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
                  removed && "line-through",
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
            {removed ? (
              <Tooltip textContent="Desfazer">
                <IconButton
                  variantStyle="dark-ghost"
                  onClick={() => unDoRemoveExerciseToList(exerciseUuid)}
                  icon={<CiUndo />}
                />
              </Tooltip>
            ) : (
              <Tooltip textContent="Remover Exercício">
                <IconButton
                  variantStyle="warning"
                  onClick={() => removeExerciseToList(exerciseUuid)}
                  icon={<MdOutlineDoubleArrow className="rotate-180" />}
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

UpdateExercisesListSelectedRow.displayName = "UpdateExercisesListSelectedRow";
