import { Button } from "@/components/ui/buttons/Button";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { IDE } from "@/modules/submission/components/IDE";
import { useIDEExercise } from "./useIDEExercises";
import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";
import {
  SubmissionStatus,
  SubmissionStatusLabels,
} from "@/modules/submission/submissionType";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { getContrastColor } from "@/utils/colors";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { Code } from "@/components/ui/dataDisplay/Code";
import { Table } from "@/components/ui/dataDisplay/Table";
import { CodeEditor } from "@/components/ui/forms/inputs/CodeEditor";

interface IDEExerciseProps {
  exercise: IExercise;
}

export const IDEExercise = ({ exercise }: IDEExerciseProps) => {
  // console.log(exercise);

  const {
    sourceCode,
    isSubmitting,
    submitError,
    avaliableLanguages,
    submissionsResult,
    createSubmission,
    changeSourceCode,
  } = useIDEExercise(exercise);

  // const showFeedbackDots = useMemo(() => {
  //   if (isSubmitting) return true;
  //   const submissionsStatus = exerciseSubmissionStatus?.get(exercise?.uuid!);
  //   console.log("submissionsStatus", submissionsStatus);
  //   if (!submissionsStatus) return false;
  //   if (
  //     [SubmissionStatus.PENDING, SubmissionStatus.RUNNING].includes(
  //       submissionsStatus?.status,
  //     )
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }, [isSubmitting, exerciseSubmissionStatus, exercise?.uuid]);

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
            onClick={createSubmission}
            disabled={!sourceCode?.trim()}
          >
            Executar 🚀
          </Button>
        </div>
        {/* <Button variantStyle="success">Submit</Button> */}
        {/* </ButtonGroup> */}
        {isSubmitting && (
          <div className="mt-4">
            <ThreeDotsLoading />
          </div>
        )}
        {submitError && (
          <div className="mt-4">
            <TerminalCode content={submitError?.description || ""} />
          </div>
        )}
        {submissionsResult?.testCasesResults && (
          <div className="mt-4">
            {submissionsResult?.status ===
            SubmissionStatus.COMPILATION_ERROR ? (
              <>
                <TerminalCode
                  content={
                    submissionsResult?.testCasesResults?.[0]?.output || ""
                  }
                />
                {/* <CodeEditor
                  mode="c_cpp"
                  theme="terminal"
                  readOnly
                  value={submissionsResult?.testCasesResults?.[0]?.output || ""}
                /> */}
              </>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {submissionsResult?.testCasesResults?.map(
                  ({ status }, index) => (
                    <div
                      key={`response-${index}`}
                      className="flex flex-col gap-2 col-span-1"
                    >
                      <div className="flex items-center gap-2">
                        <p>
                          <span className="text-xs">Caso {index + 1}:</span>{" "}
                          <Badge
                            variant="info"
                            style={
                              status
                                ? {
                                    backgroundColor:
                                      SubmissionStatusLabels?.[status]?.color,
                                    color: getContrastColor(
                                      SubmissionStatusLabels?.[status]?.color,
                                    ),
                                  }
                                : undefined
                            }
                          >
                            {SubmissionStatusLabels?.[status!]?.label}{" "}
                            {SubmissionStatusLabels?.[status!]?.emoji}
                          </Badge>
                        </p>
                      </div>
                      <div
                        className="border rounded-md"
                        style={{
                          borderColor: SubmissionStatusLabels?.[status!]?.color,
                        }}
                      >
                        <CustomDataTable
                          columns={[
                            "Entrada(s)",
                            "Saída esperada",
                            "Saída do seu código",
                          ]}
                          data={[submissionsResult?.testCasesResults[index]]}
                          idExtractor={() => `response-${index}`}
                          renderItem={({ item }) => (
                            <Table.Row>
                              <Table.Data>
                                <Code htmlContent={item?.input || ""} />
                              </Table.Data>
                              <Table.Data>
                                <Code
                                  htmlContent={item?.expectedOutput || ""}
                                />
                              </Table.Data>
                              <Table.Data>
                                <Code htmlContent={item?.output || ""} />
                              </Table.Data>
                            </Table.Row>
                          )}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
