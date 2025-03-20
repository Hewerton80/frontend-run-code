"use client";
import { Button } from "@/components/ui/buttons/Button";
import { DataTable } from "@/components/ui/dataDisplay/DataTable";
import Link from "next/link";

export default function ProblemsPage() {
  const columns = [
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
            <Link href={`/problems/${exercice?.id}`}>View</Link>
          </Button>
        </div>
      ),
    },
  ]

  const dataRow = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
    },
  ]
  return (
    <div className="flex w-full">
      <DataTable
        columns={columns}
        data={dataRow}
      />
    </div>
  );
}
