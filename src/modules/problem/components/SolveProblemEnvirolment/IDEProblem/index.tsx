"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { IProblem } from "@/modules/problem/problemTypes";
import { IDE } from "@/modules/submission/components/IDE";
import { Fragment } from "react";
import { useIDEProblem } from "./useIDEProblem";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { ResultTestCode } from "@/modules/submission/hooks/useTestCode";
import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";
import { twMerge } from "tailwind-merge";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";

interface IDEProblemProps {
  problem: IProblem;
}

export const IDEProblem = ({ problem }: IDEProblemProps) => {
  const {
    sourceCode,
    isTestingCode,
    testCodeError,
    testCodeResponse,
    testCode,
    changeSourceCode,
  } = useIDEProblem(problem!);

  const responseColumns: IColmunDataTable<ResultTestCode>[] = [
    {
      field: "inputs",
      label: "Entrada(s) para teste",
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
      label: "Saída esperada",
      onParse: (test) => (
        <div className="font-[monospace] whitespace-pre">
          {parseStringToHtmlFormat(test?.expectedOutput || "")}
        </div>
      ),
    },
    {
      field: "output",
      label: "Saída do seu código",
      onParse: (test) => (
        <div className="font-[monospace] whitespace-pre">
          {parseStringToHtmlFormat(test?.output || "")}
        </div>
      ),
    },
  ];

  // const responseRows

  return (
    <>
      <Card.Root className="gap-4 col-span-8 h-full p-4">
        <IDE value={sourceCode} onChange={changeSourceCode} />
        <div className="flex justify-end">
          {/* <ButtonGroup> */}
          <Button
            variantStyle="info"
            isLoading={isTestingCode}
            onClick={testCode}
          >
            Run Code
          </Button>
          {/* <Button variantStyle="success">Submit</Button> */}
          {/* </ButtonGroup> */}
        </div>
      </Card.Root>
      {isTestingCode && (
        <div className="py-4">
          <ThreeDotsLoading />
        </div>
      )}
      {testCodeError && (
        <TerminalCode content={testCodeError?.description || ""} />
      )}
      {testCodeResponse && (
        <div className="grid grid-cols-2 gap-4">
          {testCodeResponse?.tests?.map(({ status }, index) => (
            <div
              key={`response-${index}`}
              className="flex flex-col gap-2 col-span-1"
            >
              <div className="flex items-center gap-2">
                <p>
                  <span className="text-xs">Case {index + 1}:</span>{" "}
                  {status === "FAIL" ? "😞" : "😀"}&nbsp;
                </p>
              </div>

              <DataTable
                className={twMerge(
                  "h-full",
                  status === "FAIL" ? "border-danger" : "border-success"
                )}
                key={`response-${index}`}
                columns={responseColumns}
                data={[testCodeResponse?.tests[index]]}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
