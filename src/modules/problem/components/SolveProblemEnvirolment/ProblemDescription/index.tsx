"use client";
import { Card } from "@/components/ui/cards/Card";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { IProblem, IProblemTest } from "@/modules/problem/problemTypes";
import { twMerge } from "tailwind-merge";
import { FaCode } from "react-icons/fa";
import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";
import { Fragment } from "react";

interface ProblemDescriptionProps {
  problem: IProblem;
}

export const ProblemDescription = ({ problem }: ProblemDescriptionProps) => {
  // console.log({ problem, testCases: problem?.testCases });
  const exampleColumns: IColmunDataTable<IProblemTest>[] = [
    {
      field: "inputs",
      label: "Entrada(s)",
      onParse: (test) => (
        <div className="font-[monospace] whitespace-pre">
          {test?.inputs?.map((input, index) => (
            <Fragment key={`inpunt-${index}`}>
              {parseStringToHtmlFormat(`${input}\n`)}
            </Fragment>
          ))}
        </div>
      ),
    },
    {
      field: "expectedOutput",
      label: "Output Example",
      onParse: (test) => (
        <div className="font-[monospace] whitespace-pre">
          {parseStringToHtmlFormat(test?.expectedOutput)}
        </div>
      ),
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
      <DataTable columns={exampleColumns} data={problem?.testCases || []} />
    </Card.Root>
  );
};
