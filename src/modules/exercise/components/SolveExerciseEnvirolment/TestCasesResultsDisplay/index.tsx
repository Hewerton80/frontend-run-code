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
import { memo, useEffect, useMemo, useRef } from "react";
import { Alert } from "@/components/ui/feedback/Alert";
import { useCachedSubmissionJobs } from "@/modules/submission/hooks/useCachedSubmissionJobs";
import { useMutationState } from "@tanstack/react-query";
import { useGetCreateSubmissionState } from "@/modules/submission/hooks/useGetCreateSubmissionState";
import { ProcessingSubmissionState } from "@/modules/submission/components/ProcessingSubmissionState";
import { ProcessedSubmissionSuccessState } from "@/modules/submission/components/ProcessedSubmissionSuccessState";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";

interface TestCasesResultsDisplayProps {
  exerciseUuId: string;
}

export const TestCasesResultsDisplay = memo(
  ({ exerciseUuId }: TestCasesResultsDisplayProps) => {
    const mutationStates = useGetCreateSubmissionState(exerciseUuId);

    const { status: creteSubmissionStatus, error: createSubmissionError } =
      useMemo(
        () => ({
          status: mutationStates?.status,
          error: mutationStates?.error,
        }),
        [mutationStates],
      );

    const { cachedSubmissionJobs } = useCachedSubmissionJobs();

    const submissionsResponse = useMemo(() => {
      const foundSubmissionResult = cachedSubmissionJobs.find(
        (job) => job.exerciseUuId === exerciseUuId,
      );
      return foundSubmissionResult;
    }, [cachedSubmissionJobs, exerciseUuId]);

    const isProcessing = useMemo(
      () =>
        submissionsResponse?.isProcessing ||
        creteSubmissionStatus === "pending",
      [submissionsResponse, creteSubmissionStatus],
    );

    const submissionsResultSummary = useMemo(
      () => submissionsResponse?.result,
      [submissionsResponse],
    );

    const testCasesResults = useMemo(
      () => submissionsResultSummary?.testCasesResults,
      [submissionsResultSummary],
    );

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (
        (!isProcessing &&
          !submissionsResultSummary &&
          !createSubmissionError) ||
        !containerRef.current
      ) {
        return;
      }
      const raf = requestAnimationFrame(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
      return () => cancelAnimationFrame(raf);
    }, [isProcessing, createSubmissionError, submissionsResultSummary]);

    const handledContent = useMemo(() => {
      if (isProcessing) {
        return <ProcessingSubmissionState />;
      }

      if (createSubmissionError) {
        return (
          <TerminalCode
            className="mt-4"
            content={
              (createSubmissionError as any)?.description || "Erro desconhecido"
            }
          />
        );
      }

      if (
        submissionsResultSummary?.status === SubmissionStatus.COMPILATION_ERROR
      ) {
        const Icon = SUBMISSION_META?.[submissionsResultSummary.status]?.icon;

        return (
          <div className="flex flex-col gap-0.5">
            <span className="inline-flex items-center text-sm text-muted-foreground">
              Erro de compilação: <Icon className="w-4 h-4 ml-1" />
            </span>
            <TerminalCode content={testCasesResults?.[0]?.output || ""} />
          </div>
        );
      }

      if (submissionsResultSummary) {
        return (
          <>
            {submissionsResultSummary?.score === 1 && (
              <ProcessedSubmissionSuccessState
                xp={
                  submissionsResultSummary?.wasAlreadyAccepted &&
                  submissionsResultSummary?.newUserStats?.xpEarned
                    ? undefined
                    : submissionsResultSummary?.newUserStats?.xpEarned
                }
              />
            )}
            <Tabs.Root defaultValue="1">
              <Tabs.List>
                {testCasesResults?.map((testCaseResult, index) => {
                  const Icon = SUBMISSION_META?.[testCaseResult?.status!]?.icon;
                  const label =
                    SUBMISSION_META?.[testCaseResult?.status!]?.label;
                  const color =
                    SUBMISSION_META?.[testCaseResult?.status!]?.color;
                  return (
                    <Tooltip
                      key={`trigger-${index}`}
                      align="center"
                      className="gap-2"
                      textContent={
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex gap-1 items-center">
                            {label} {<Icon className={cn("w-4 h-4", color)} />}
                          </span>
                          {!testCaseResult?.isPublic && (
                            <span className="text-muted-foreground">
                              Informações de caso de teste privado 🔒{" "}
                            </span>
                          )}
                        </div>
                      }
                    >
                      <span>
                        <Tabs.Trigger
                          value={(index + 1).toString()}
                          disabled={!testCaseResult?.isPublic}
                        >
                          <span className="inline-flex items-center gap-1">
                            {!testCaseResult?.isPublic && <span>🔒 </span>}
                            Teste {index + 1}:{" "}
                            {<Icon className={cn("w-4 h-4", color)} />}
                          </span>
                        </Tabs.Trigger>
                      </span>
                    </Tooltip>
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
                  <div className="flex flex-col gap-2">
                    {[
                      {
                        label: "Resultado:",
                        content: (
                          <span>
                            {SUBMISSION_META?.[testCaseResult?.status!]?.label}
                            {/* {SUBMISSION_META?.[testCaseResult?.status!]?.icon} */}
                          </span>
                        ),
                      },
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
                        <span className="inline-flex items-center text-sm text-muted-foreground">
                          {item.label}
                        </span>
                        <TerminalCode
                          animation={false}
                          content={item.content}
                        />
                      </div>
                    ))}
                  </div>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </>
        );
      }
      return null;
    }, [
      isProcessing,
      createSubmissionError,
      submissionsResultSummary,
      testCasesResults,
    ]);

    return (
      <div
        data-testid="test-cases-container"
        ref={containerRef}
        className="flex flex-col gap-4 border-t"
      >
        <Separator orientation="horizontal" className="h-1" />
        {handledContent}
      </div>
    );
  },
);

TestCasesResultsDisplay.displayName = "TestCasesResultsDisplay";
