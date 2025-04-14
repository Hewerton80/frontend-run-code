"use client";
import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { useListProblems } from "./useListProblems";
import { IProblem } from "../../../problem/problemTypes";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Breadcrumbs } from "@/components/ui/dataDisplay";

export const ListProblems = () => {
  const { isProblemsLoading, problems, problemsError, refetchProblems } =
    useListProblems();

  const columns: IColmunDataTable<IProblem>[] = [
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
      label: "Difficulty",
    },
    {
      field: "actions",
      label: "",
      onParse: (problem) => (
        <div className="flex justify-end">
          <Button variantStyle="dark-ghost" asChild>
            <ProgressLink href={`/problems/${problem?.id}`}>View</ProgressLink>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full px-32 pt-6 pb-4">
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
      />
    </div>
  );
};
