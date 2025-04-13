"use client";
import { Button } from "@/components/ui/buttons/Button";
import { IProblem } from "@/modules/problem/problemTypes";
import { IDE } from "@/modules/submission/components/IDE";
import { useIDEProblem } from "./useIDEProblem";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { ResultSubmissionCode } from "@/modules/submission/hooks/useSubmitCode";
import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";
import { twMerge } from "tailwind-merge";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";

interface IDEProblemProps {
  problem: IProblem;
}

export const IDEProblem = ({ problem }: IDEProblemProps) => {
  // console.log(problem);
  const {
    sourceCode,
    isSubmitting,
    submitError,
    submitResponse,
    submitCode,
    changeSourceCode,
  } = useIDEProblem(problem);

  const responseColumns: IColmunDataTable<ResultSubmissionCode>[] = [
    {
      field: "inputs",
      label: "Entrada(s) para teste",
      onParse: (test) => (
        <div className="font-[monospace] whitespace-pre">
          {parseStringToHtmlFormat(test?.inputs?.join("\n") || "")}
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
      <div className="flex flex-col w-full col-span-8 h-full p-4">
        <IDE value={sourceCode} onChange={changeSourceCode} />
        <div className="flex justify-end mt-4">
          {/* <ButtonGroup> */}
          <Button
            variantStyle="info"
            isLoading={isSubmitting}
            onClick={submitCode}
            disabled={!sourceCode?.trim()}
          >
            Executar 🚀
          </Button>
        </div>
        {/* <Button variantStyle="success">Submit</Button> */}
        {/* </ButtonGroup> */}
        {isSubmitting && (
          <div className="py-4">
            <ThreeDotsLoading />
          </div>
        )}
        {submitError && (
          <TerminalCode
            className="mt-4"
            content={submitError?.description || ""}
          />
        )}
        {submitResponse && (
          <div className="grid grid-cols-2 gap-4">
            {submitResponse?.externalSubmissionResponse?.map(
              ({ status }, index) => (
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
                    data={[submitResponse?.externalSubmissionResponse[index]]}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};
