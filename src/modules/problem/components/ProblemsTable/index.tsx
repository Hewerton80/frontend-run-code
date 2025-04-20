"use client";
import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { useProblems } from "./useProblems";
import { IProblem } from "../../problemTypes";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { useMemo } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";

export const ProblemsTable = () => {
  const { loggedUser } = useAuth();

  const {
    isProblemsLoading,
    problems,
    problemsError,
    goToPage,
    refetchProblems,
  } = useProblems();

  const columns = useMemo<IColmunDataTable<IProblem>[]>(() => {
    const resultColumns: IColmunDataTable<IProblem>[] = [
      {
        field: "title",
        label: "Título",
        onParse: (problem) => <p className="line-clamp-1">{problem?.title}</p>,
      },
      {
        field: "category",
        label: "Categoria",
        onParse: (problem) => (
          <p className="line-clamp-1">{problem?.category?.name}</p>
        ),
      },
      {
        field: "difficulty",
        label: "Dificuldade",
      },
      {
        field: "author",
        label: "Autor",
        onParse: (problem) => <GroupedUserInfo user={problem?.author!} />,
      },
    ];

    if (loggedUser?.role === 3) {
      resultColumns.push({
        field: "actions",
        label: "",
        onParse: () => (
          <div className="flex justify-end">
            <IconButton
              variantStyle="dark-ghost"
              icon={<BsThreeDotsVertical />}
            />
          </div>
        ),
      });
    } else {
      resultColumns.push({
        field: "actions",
        label: "",
        onParse: (problem) => (
          <div className="flex justify-end">
            <Button variantStyle="dark-ghost" asChild>
              <ProgressLink href={`/problems/${problem?.uuid}`}>
                View
              </ProgressLink>
            </Button>
          </div>
        ),
      });
    }
    return resultColumns;
  }, [loggedUser]);

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        isLoading={isProblemsLoading}
        items={[{ label: "🧩 Problemas" }]}
      />
      <DataTable
        columns={columns}
        data={problems?.data || []}
        isLoading={isProblemsLoading}
        isError={!!problemsError}
        onTryAgainIfError={refetchProblems}
        paginationConfig={{
          currentPage: problems?.currentPage || 1,
          totalPages: problems?.lastPage || 1,
          perPage: problems?.perPage || 25,
          totalRecords: problems?.total || 1,
          onChangePage: goToPage,
        }}
      />
    </div>
  );
};
