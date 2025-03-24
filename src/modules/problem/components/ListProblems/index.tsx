"use client";
import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { useListProblems } from "./useListProblems";
import { IProblem } from "../../problemTypes";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Breadcrumbs } from "@/components/ui/dataDisplay";

export const ListProblems = () => {
  const { isProblemsLoading, problems, problemsError, refetchProblems } =
    useListProblems();

  const columns: IColmunDataTable<IProblem>[] = [
    {
      field: "title",
      label: "Title",
    },
    {
      field: "difficulty",
      label: "Difficulty",
    },
    {
      field: "actions",
      label: "",
      onParse: (exercice: any) => (
        <div className="flex justify-end">
          <Button variantStyle="dark-ghost" asChild>
            <ProgressLink href={`/problems/${exercice?.id}`}>View</ProgressLink>
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
