"use client";
import { Card } from "@/components/ui/cards/Card";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { IProblem, IProblemTest } from "@/modules/problem/problemTypes";
import { twMerge } from "tailwind-merge";
import { FaCode } from "react-icons/fa";
import { Badge } from "@/components/ui/dataDisplay/Badge";

interface ProblemDescriptionProps {
  problem?: IProblem;
}

export const ProblemDescription = ({ problem }: ProblemDescriptionProps) => {
  const exampleColumns: IColmunDataTable<IProblemTest>[] = [
    {
      field: "inputs",
      label: "Inputs Example",
      onParse: (test) => (
        <div className="flex flex-wrap gap-2">
          {test?.inputs?.map((input, index) => (
            <Badge variant="info" key={index}>
              {input}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      field: "expectedOutput",
      label: "Output Example",
      onParse: (test) => <div>{test?.expectedOutput}</div>,
    },
  ];

  return (
    <Card.Root
      className={twMerge(
        "flex flex-col h-full p-4 gap-2 ",
        "border-l-3 border-l-info rounded-l-none"
      )}
    >
      <div className="flex items-center gap-2">
        <FaCode className="text-info" />{" "}
        <h3 className="text-lg">{problem?.title}</h3>
      </div>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: problem?.description || "" }}
      />
      <DataTable columns={exampleColumns} data={problem?.tests || []} />
    </Card.Root>
  );
};
