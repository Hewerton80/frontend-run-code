"use client";
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
import { MdOutlineDoubleArrow } from "react-icons/md";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { twMerge } from "tailwind-merge";
import { CiUndo } from "react-icons/ci";
import {
  IUpdateClassroomList,
  useUpdateClassroomLists,
} from "./useUpdateClassroomLists";
import Link from "next/link";

export const UpdateClassroomLists = () => {
  const {
    isListProblemsLoading,
    listProblems,
    listProblemsError,
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
    refetchListProblems,
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
                <p>Autor:</p>
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
            { label: "📝 Listas", href: `/classroom/${classroom?.uuid}/lists` },
            { label: "Atualizar" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <DataTable
              columns={allListscolumns}
              data={listProblems?.data || []}
              isLoading={isListProblemsLoading}
              isError={!!listProblemsError}
              onTryAgainIfError={refetchListProblems}
              paginationConfig={{
                currentPage: listProblems?.currentPage || 1,
                totalPages: listProblems?.lastPage || 1,
                perPage: listProblems?.perPage || 25,
                totalRecords: listProblems?.total || 1,
                onChangePage: goToPage,
              }}
            />
          </div>
          <div>
            <DataTable
              columns={currentClassroomListsColumns}
              data={classroomListsToAdd || []}
              // isLoading={isListProblemsLoading}
              // isError={!!listProblemsError}
              // onTryAgainIfError={refetchListProblems}
              // paginationConfig={{
              //   currentPage: listProblems?.currentPage || 1,
              //   totalPages: listProblems?.lastPage || 1,
              //   perPage: listProblems?.perPage || 25,
              //   totalRecords: listProblems?.total || 1,
              //   onChangePage: goToPage,
              // }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {/* <p>Selecionado(s): {quantitySelected}</p> */}
          <Button
            fullWidth
            // disabled={!quantitySelected}
            onClick={() => updateClassroomLists()}
            isLoading={isUpdatingClassroomLists}
          >
            Salvar
          </Button>
          <Link href={`/classroom/${classroom?.uuid}/lists`}>
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
