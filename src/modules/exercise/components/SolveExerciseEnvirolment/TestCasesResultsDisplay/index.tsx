import { Badge } from "@/components/ui/dataDisplay/Badge";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { Tabs } from "@/components/ui/navigation/Tabs";
import {
  SubmissionResultSummary,
  SubmissionTestCaseResult,
} from "@/modules/submission/hooks/useFetchSubmissionJobs";
import {
  SUBMISSION_META,
  SubmissionStatus,
} from "@/modules/submission/submissionType";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { memo, useMemo } from "react";
import { Alert } from "@/components/ui/feedback/Alert";
import { useCachedSubmissionJobs } from "@/modules/submission/hooks/useCachedSubmissionJobs";

interface TestCasesResultsDisplayProps {
  exerciseUuId: string;
}

export const TestCasesResultsDisplay = memo(
  ({ exerciseUuId }: TestCasesResultsDisplayProps) => {
    const { cachedSubmissionJobs, addCachedSubmissionJob } =
      useCachedSubmissionJobs();

    const submissionsResponse = useMemo(() => {
      const foundSubmissionResult = cachedSubmissionJobs.find(
        (job) => job.exerciseUuId === exerciseUuId,
      );
      return foundSubmissionResult;
    }, [cachedSubmissionJobs, exerciseUuId]);
    console.log("testCasesResults", submissionsResponse?.isProcessing);

    const isProcessing = useMemo(
      () => submissionsResponse?.isProcessing,
      [submissionsResponse],
    );

    const submissionsResult = useMemo(
      () => submissionsResponse?.result,
      [submissionsResponse],
    );

    const testCasesResults = useMemo(
      () => submissionsResult?.testCasesResults,
      [submissionsResult],
    );
    if (!submissionsResult) return null;

    if (submissionsResult?.status === SubmissionStatus.COMPILATION_ERROR) {
      return <TerminalCode content={testCasesResults?.[0]?.output || ""} />;
    }

    return (
      <>
        {submissionsResult?.score === 1 && (
          <Alert.Root variant="success" hideIcon>
            <Alert.Title>Parabéns! 🎉</Alert.Title>
            <Alert.Description>
              Você resolveu o exercício com sucesso!
              {/* TODO adicionar botao de ir para o próximo exercício, para isso deve verificar se tenho o ids do exercícios no cache da lista */}
            </Alert.Description>
          </Alert.Root>
        )}
        <Tabs.Root defaultValue="1">
          <Tabs.List>
            {testCasesResults?.map((testCaseResult, index) => {
              const Icon = SUBMISSION_META?.[testCaseResult?.status!]?.icon;
              const label = SUBMISSION_META?.[testCaseResult?.status!]?.label;
              const tone = SUBMISSION_META?.[testCaseResult?.status!]?.tone;
              return (
                <Tabs.Trigger
                  key={`trigger-${index}`}
                  value={(index + 1).toString()}
                >
                  <span>
                    <Tooltip
                      align="center"
                      className="gap-2"
                      textContent={
                        <span className="inline-flex gap-2 items-center">
                          {label} {<Icon />}
                        </span>
                      }
                    >
                      <span className="inline-flex items-center">
                        Teste {index + 1}:{" "}
                        {!testCaseResult?.isPublic && <span>🔒</span>}
                        {<Icon className="w-4 h-4 ml-1" />}
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
              {/* <div className="flex flex-col gap-0.5">
                      <p className="text-sm text-muted-foreground">Resultado</p>
                      <SubmissionStatusBadge
                        className="p-4 text-sm uppercase gap-4"
                        status={testCaseResult?.status}
                      />
                    </div> */}
              <div className="flex flex-col gap-0.5">
                {[
                  // {
                  //   label: "Resultado:",
                  //   content: (
                  //     <span>
                  //       {
                  //         SUBMISSION_META?.[testCaseResult?.status!]
                  //           ?.label
                  //       }
                  //       {SUBMISSION_META?.[testCaseResult?.status!]?.icon}
                  //     </span>
                  //   ),
                  // },
                  ...(testCaseResult?.isPublic
                    ? [
                        {
                          label: "Entrada (input):",
                          content: testCaseResult?.input || "",
                        },
                        //  TODO dependendo do status, nao exibor a resposta de erro
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
                    <TerminalCode animation={false} content={item.content} />
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
    );
  },
);

TestCasesResultsDisplay.displayName = "TestCasesResultsDisplay";
