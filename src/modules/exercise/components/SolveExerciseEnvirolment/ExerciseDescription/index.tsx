"use client";
import { Card } from "@/components/ui/cards/Card";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { IExercise, IExerciseTest } from "@/modules/exercise/exerciseTypes";
import { twMerge } from "tailwind-merge";
import { FaCode } from "react-icons/fa";
import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";

interface ExerciseDescriptionProps {
  exercise: IExercise;
  orientation?: "horizontal" | "vertical";
}

export const ExerciseDescription = ({
  exercise,
  orientation = "vertical",
}: ExerciseDescriptionProps) => {
  const exampleColumns: IColmunDataTable<IExerciseTest>[] = [
    {
      field: "input",
      label: "Entrada(s)",
      onParse: (test) => (
        <div
          className="font-[monospace] whitespace-pre"
          dangerouslySetInnerHTML={{
            __html: parseStringToHtmlFormat(test?.input || ""),
          }}
        />
      ),
    },
    {
      field: "expectedOutput",
      label: "Exemplo de saída",
      onParse: (test) => (
        <div
          className="font-[monospace] whitespace-pre"
          dangerouslySetInnerHTML={{
            __html: parseStringToHtmlFormat(test?.expectedOutput || ""),
          }}
        />
      ),
    },
  ];

  return (
    <div
      className={twMerge(
        "grid h-full gap-2",
        orientation === "vertical" ? "grid-cols-1" : "grid-cols-12"
      )}
    >
      <div
        className={twMerge(
          "flex flex-col gap-2 w-full",
          orientation === "horizontal" && "col-span-8"
        )}
      >
        <div className="flex items-center gap-2">
          <FaCode className="text-info" />{" "}
          <h3 className="text-lg">{exercise?.title}</h3>
        </div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: exercise?.description || "" }}
        />
      </div>
      <div className={orientation === "horizontal" ? "col-span-4" : ""}>
        <DataTable columns={exampleColumns} data={exercise?.testCases || []} />
      </div>
    </div>
  );
};
