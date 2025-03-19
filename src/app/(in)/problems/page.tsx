"use client";
import { Button } from "@/components/ui/buttons/Button";
import { DataTable } from "@/components/ui/dataDisplay/DataTable";
import Link from "next/link";

export default function ProblemsPage() {
  return (
    <div className="flex w-full">
      <DataTable
        columns={[
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
            onParse: (exercice) => (
              <div className="flex justify-end">
                <Button variantStyle="dark-ghost" asChild>
                  <Link href={`/problems/${exercice?.id}`}>View</Link>
                </Button>
              </div>
            ),
          },
        ]}
        data={[
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
        ]}
      />
    </div>
  );
}
