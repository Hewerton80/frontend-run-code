import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { DateTime } from "@/utils/dateTime";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { twMerge } from "tailwind-merge";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { CiUndo } from "react-icons/ci";
import {
  IUpdateClassroomList,
  useUpdateClassroomLists,
} from "./useUpdateClassroomLists";
import { Link } from "react-router-dom";

export const UpdateClassroomLists = () => {
  const {
    isListExercisesLoading,
    listExercises,
    listExercisesError,
    classroom,
    isLoadingClassroom,
    classroomListsToAddRecords,
    classroomListsToAdd,
    isUpdatingClassroomLists,
    updateClassroomLists,
    checkVisibility,
    unDoRemoveListToClassroom,
    addListToClassroom,
    goToPage,
    refetchListExercises,
    removeListToClassroom,
  } = useUpdateClassroomLists();

  const groupedListInfo = (list: IUpdateClassroomList) => {
    return (
      <div className="flex flex-col">
        <Tooltip
          textContent={
            <div className="flex flex-col">
              <span>{list?.title}</span>
              <span className="text-xs text-muted-foreground">
                Criada em: {DateTime.format(list?.createdAt!, "dd MMM, yyyy")}
              </span>
              <div className="flex flex-col mt-2 ">
                <p>Autor(a):</p>
                <GroupedUserInfo user={list?.author!} />
              </div>
            </div>
          }
          align="start"
        >
          <p
            className={twMerge(
              "line-clamp-1 w-fit cursor-pointer hover:underline",
              list?.removed && "line-through"
            )}
          >
            {list?.title}
          </p>
        </Tooltip>
        <span className="text-xs text-muted-foreground">
          Criada em: {DateTime.format(list?.createdAt!, "dd MMM, yyyy")}
        </span>
      </div>
    );
  };

  const allListscolumns: IColmunDataTable<IUpdateClassroomList>[] = [
    {
      field: "title",
      label: "Título",
      onParse: (list) => groupedListInfo(list),
    },
    {
      field: "actions",
      label: "",
      onParse: (list) => (
        <div className="flex items-center justify-end gap-2">
          {!classroomListsToAddRecords?.[list?.uuid!] ? (
            <Tooltip textContent="Adicionar lista">
              <IconButton
                onClick={() => addListToClassroom(list?.uuid!)}
                icon={<MdOutlineDoubleArrow />}
              />
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      ),
    },
  ];

  const currentClassroomListsColumns: IColmunDataTable<IUpdateClassroomList>[] =
    [
      {
        field: "title",
        label: "Título",
        onParse: (list) => groupedListInfo(list),
      },
      {
        field: "isVisible",
        label: "Visível",
        onParse: (list) => (
          <Checkbox
            disabled={list?.removed}
            checked={list?.isVisible}
            onCheckedChange={(checked) =>
              checkVisibility(list?.uuid!, checked === true)
            }
          />
        ),
      },
      {
        field: "actions",
        label: "",
        onParse: (list) => (
          <div className="flex items-center justify-end gap-2">
            {list?.removed ? (
              <Tooltip textContent="Desfazer">
                <IconButton
                  variantStyle="dark-ghost"
                  onClick={() => unDoRemoveListToClassroom(list?.uuid!)}
                  icon={<CiUndo />}
                />
              </Tooltip>
            ) : (
              <Tooltip textContent="Remover lista">
                <IconButton
                  variantStyle="warning"
                  onClick={() => removeListToClassroom(list?.uuid!)}
                  icon={<MdOutlineDoubleArrow className="rotate-180" />}
                />
              </Tooltip>
            )}
          </div>
        ),
      },
    ];

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          isLoading={isLoadingClassroom}
          items={[
            { label: "🏠 Home", href: "/home" },
            { label: classroom?.name || "-" },
            {
              label: "📝 Listas",
              href: `/classroom/${classroom?.uuid}/lists`,
            },
            { label: "Atualizar" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-y-auto max-h-[calc(100vh-282px)]">
            <DataTable
              columns={allListscolumns}
              data={listExercises?.data || []}
              isLoading={isListExercisesLoading}
              isError={!!listExercisesError}
              onTryAgainIfError={refetchListExercises}
              paginationConfig={{
                currentPage: listExercises?.currentPage || 1,
                totalPages: listExercises?.lastPage || 1,
                perPage: listExercises?.perPage || 25,
                totalRecords: listExercises?.total || 1,
                onChangePage: goToPage,
              }}
            />
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-282px)]">
            <DataTable
              columns={currentClassroomListsColumns}
              data={classroomListsToAdd || []}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {/* <p>Selecionado(s): {quantitySelected}</p> */}
          <Button
            fullWidth
            onClick={() => updateClassroomLists()}
            isLoading={isUpdatingClassroomLists}
          >
            Salvar
          </Button>
          <Link to={`/classroom/${classroom?.uuid}/lists`}>
            <Button
              fullWidth
              variantStyle="secondary"
              // disabled={!quantitySelected}
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
