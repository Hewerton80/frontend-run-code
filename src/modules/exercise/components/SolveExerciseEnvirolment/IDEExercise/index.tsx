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
import { Tabs } from "@/components/ui/navigation/Tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useMemo } from "react";
import { Alert } from "@/components/ui/feedback/Alert";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

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

  const testCasesResults = useMemo(
    () => submissionsResult?.testCasesResults,
    [submissionsResult],
  );

  return (
    <>
      <div className="flex flex-col w-full col-span-8 h-full p-4 gap-4">
        <IDE
          value={sourceCode}
          avaliableLanguages={avaliableLanguages}
          onChange={changeSourceCode}
        />
        <div className="flex justify-end ">
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
        {isSubmitting && <ThreeDotsLoading />}
        {submitError && (
          <TerminalCode content={submitError?.description || ""} />
        )}
        {submissionsResult?.score === 1 && (
          <Alert.Root variant="success" hideIcon>
            <Alert.Title>Parabéns! 🎉</Alert.Title>
            <Alert.Description>
              Você resolveu o exercício com sucesso!
              {/* TODO adicionar botao de ir para o próximo exercício, para isso deve verificar se tenho o ids do exercícios no cache da lista */}
            </Alert.Description>
          </Alert.Root>
        )}
        {/* TODO omitir casos de testes públicos */}
        {testCasesResults && (
          <div>
            {submissionsResult?.status ===
            SubmissionStatus.COMPILATION_ERROR ? (
              <TerminalCode content={testCasesResults?.[0]?.output || ""} />
            ) : (
              <>
                <Tabs.Root defaultValue="1">
                  <Tabs.List>
                    {testCasesResults?.map((testCaseResult, index) => {
                      const emoji =
                        SubmissionStatusLabels?.[testCaseResult?.status!]
                          ?.emoji;
                      const label =
                        SubmissionStatusLabels?.[testCaseResult?.status!]
                          ?.label;
                      return (
                        <Tabs.Trigger
                          key={`trigger-${index}`}
                          value={(index + 1).toString()}
                        >
                          <span>
                            <Tooltip
                              align="center"
                              className="gap-2"
                              textContent={`${label} ${emoji}`}
                            >
                              <span>
                                Teste {index + 1}: {emoji}
                              </span>
                            </Tooltip>
                          </span>
                        </Tabs.Trigger>
                      );
                    })}
                  </Tabs.List>
                  {/* TODO analizar a possibilidade de adicionar memória e runtime aqui */}
                  {testCasesResults?.map((testCaseResult, index) => (
                    <Tabs.Content
                      key={`response-${index}`}
                      value={(index + 1).toString()}
                    >
                      <div className="flex flex-col gap-0.5">
                        {[
                          {
                            label: "Resultado:",
                            content:
                              [
                                SubmissionStatusLabels?.[
                                  testCaseResult?.status!
                                ]?.label || "",
                                SubmissionStatusLabels?.[
                                  testCaseResult?.status!
                                ]?.emoji || "",
                              ].join(" ") || "",
                          },
                          ...(testCaseResult?.isPublic
                            ? [
                                {
                                  label: "Entrada (input):",
                                  content: testCaseResult?.input || "",
                                },
                                {
                                  label: "Saída do seu código:",
                                  content: testCaseResult?.output || "",
                                },
                                {
                                  label: "Saída Esperada:",
                                  content: testCaseResult?.expectedOutput || "",
                                },
                              ]
                            : []),
                        ].map((item, idx) => (
                          <div
                            key={`item-${index}-${idx}`}
                            className="flex flex-col gap-0.5"
                          >
                            <p className="text-sm text-muted-foreground">
                              {item.label}
                            </p>
                            <TerminalCode
                              animation={false}
                              content={item.content}
                            />
                          </div>
                        ))}
                        {!testCaseResult?.isPublic && (
                          <Badge variant="dark" className="mt-2">
                            Informações de caso de teste privado 🔒
                          </Badge>
                        )}
                      </div>
                    </Tabs.Content>
                  ))}
                </Tabs.Root>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
