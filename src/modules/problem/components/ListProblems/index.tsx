"use client";
import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { useListProblems } from "./useListProblems";
import { IProblem } from "../../problemTypes";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";

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

  //   const dataRow = [
  //     {
  //       id: 1,
  //       title: "Two Sum",
  //       difficulty: "Easy",
  //     },
  //     {
  //       id: 2,
  //       title: "Add Two Numbers",
  //       difficulty: "Medium",
  //     },
  //     {
  //       id: 3,
  //       title: "Longest Substring Without Repeating Characters",
  //       difficulty: "Medium",
  //     },
  //     {
  //       id: 4,
  //       title: "Median of Two Sorted Arrays",
  //       difficulty: "Hard",
  //     },
  //   ];
  return (
    <div className="flex w-full px-32">
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
