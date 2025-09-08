import { Button } from "@/components/ui/buttons/Button";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { IDE } from "@/modules/submission/components/IDE";
import { useIDEExercise } from "./useIDEExercises";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { ResultSubmissionCode } from "@/modules/submission/hooks/useSubmitCode";
import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";
import { twMerge } from "tailwind-merge";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";
import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { SubmissionStatusLabels } from "@/modules/submission/submissionType";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { getContrastColor } from "@/utils/colors";

interface IDEExerciseProps {
  exercise: IExercise;
}

export const IDEExercise = ({ exercise }: IDEExerciseProps) => {
  // console.log(exercise);

  const {
    sourceCode,
    isSubmitting,
    submitError,
    submitResponse,
    avaliableLanguages,
    submitCode,
    changeSourceCode,
  } = useIDEExercise(exercise);
  const { changeLanguageMode } = useLanguage();

  const responseColumns: IColmunDataTable<ResultSubmissionCode>[] = [
    {
      field: "inputs",
      label: "Entrada(s) para teste",
      onParse: (test) => (
        <div
          className="font-[monospace] whitespace-pre"
          dangerouslySetInnerHTML={{
            __html: parseStringToHtmlFormat(test?.inputs?.join("\n") || ""),
          }}
        />
      ),
    },
    {
      field: "expectedOutput",
      label: "Saída esperada",
      onParse: (test) => (
        <div
          className="font-[monospace] whitespace-pre"
          dangerouslySetInnerHTML={{
            __html: parseStringToHtmlFormat(test?.expectedOutput || ""),
          }}
        />
      ),
    },
    {
      field: "output",
      label: "Saída do seu código",
      onParse: (test) => (
        <div
          className="font-[monospace] whitespace-pre"
          dangerouslySetInnerHTML={{
            __html: parseStringToHtmlFormat(test?.output || ""),
          }}
        />
      ),
    },
  ];

  // const responseRows

  return (
    <>
      <div className="flex flex-col w-full col-span-8 h-full p-4">
        <IDE
          value={sourceCode}
          avaliableLanguages={avaliableLanguages}
          onChange={changeSourceCode}
        />
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
            {submitResponse?.submissionResponse?.map(({ status }, index) => (
              <div
                key={`response-${index}`}
                className="flex flex-col gap-2 col-span-1"
              >
                <div className="flex items-center gap-2">
                  <p>
                    <span className="text-xs">Caso {index + 1}:</span>{" "}
                    {/* <span
                      style={{ color: SubmissionStatusLabels?.[status]?.color }}
                    > */}
                    <Badge
                      variant="info"
                      style={{
                        backgroundColor:
                          SubmissionStatusLabels?.[status]?.color,
                        color: getContrastColor(
                          SubmissionStatusLabels?.[status]?.color
                        ),
                      }}
                    >
                      {SubmissionStatusLabels?.[status]?.label}{" "}
                      {SubmissionStatusLabels?.[status]?.emoji}
                    </Badge>
                  </p>
                </div>

                <DataTable
                  className={twMerge(
                    "h-full"
                    // status === "FAIL" ? "border-danger" : "border-success"
                  )}
                  style={{
                    borderColor: SubmissionStatusLabels?.[status]?.color,
                  }}
                  key={`response-${index}`}
                  columns={responseColumns}
                  data={[submitResponse?.submissionResponse[index]]}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
