import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { Tabs } from "@/components/ui/navigation/Tabs";
import {
  SUBMISSION_META,
  SubmissionStatus,
} from "@/modules/submission/submissionType";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import {
  createElement,
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useCachedSubmissionJobs } from "@/modules/submission/hooks/useCachedSubmissionJobs";
import { useGetCreateSubmissionState } from "@/modules/submission/hooks/useGetCreateSubmissionState";
import { ProcessingSubmissionState } from "@/modules/submission/components/ProcessingSubmissionState";
import { ProcessedSubmissionSuccessState } from "@/modules/submission/components/ProcessedSubmissionSuccessState";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { ApiErrorState } from "@/components/ui/feedback/EmptyState";

interface TestCasesResultsDisplayLabel {
  children?: ReactNode;
  className?: string;
}

const TestCasesResultsDisplayLabel = memo(
  ({ children, className }: TestCasesResultsDisplayLabel) => {
    return (
      <span
        className={cn(
          "inline-flex items-center text-sm text-muted-foreground gap-1",
          className,
        )}
      >
        {children}
      </span>
    );
  },
);

TestCasesResultsDisplayLabel.displayName = "TestCasesResultsDisplayLabel";
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
          <TerminalCode animation={false}>
            {createSubmissionError?.message || "Erro desconhecido"}
          </TerminalCode>
        );
      }

      if (submissionsResultSummary?.status === SubmissionStatus.UNKNOWN_ERROR) {
        const Icon = SUBMISSION_META?.[submissionsResultSummary.status]?.icon;
        return (
          <ApiErrorState
            title="Erro desconhecido"
            message="Ocorreu um erro desconhecido ao processar sua submissão. Por favor, tente novamente mais tarde."
          />
        );
      }

      if (
        submissionsResultSummary?.status === SubmissionStatus.COMPILATION_ERROR
      ) {
        const Icon = SUBMISSION_META?.[submissionsResultSummary.status]?.icon;

        return (
          <div className="flex flex-col gap-0.5">
            <TestCasesResultsDisplayLabel>
              Erro de compilação: <Icon className="w-4 h-4 ml-1" />
            </TestCasesResultsDisplayLabel>
            {testCasesResults?.[0]?.output?.trim() && (
              <TerminalCode animation={false}>
                {testCasesResults?.[0]?.output}
              </TerminalCode>
            )}
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
                  const submissionMeta =
                    SUBMISSION_META?.[testCaseResult?.status!];
                  const Icon = submissionMeta?.icon;
                  const label = submissionMeta?.label;
                  const color = submissionMeta?.color;
                  return (
                    <Tooltip
                      key={`trigger-${index}`}
                      align="center"
                      className="gap-2"
                      textContent={
                        <div className="flex flex-col gap-0.5">
                          <TestCasesResultsDisplayLabel className="text-foreground">
                            {label} {<Icon className={cn("w-4 h-4", color)} />}
                          </TestCasesResultsDisplayLabel>
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
                          <TestCasesResultsDisplayLabel className="text-foreground">
                            {!testCaseResult?.isPublic && <span>🔒 </span>}
                            Teste {index + 1}:{" "}
                            {<Icon className={cn("w-4 h-4", color)} />}
                          </TestCasesResultsDisplayLabel>
                        </Tabs.Trigger>
                      </span>
                    </Tooltip>
                  );
                })}
              </Tabs.List>
              {/* TODO analizar a possibilidade de adicionar memória e runtime aqui */}
              {testCasesResults?.map((testCaseResult, index) => {
                const submissionMeta =
                  SUBMISSION_META?.[testCaseResult?.status!];
                const Icon = submissionMeta?.icon;
                const label = submissionMeta?.label;
                const color = submissionMeta?.color;
                return (
                  <Tabs.Content
                    key={`response-${index}`}
                    value={(index + 1).toString()}
                  >
                    <div className="flex flex-col gap-y-2">
                      <div className="flex flex-col gap-1 w-full sm:w-1/3">
                        <TestCasesResultsDisplayLabel>
                          Resultado:
                        </TestCasesResultsDisplayLabel>
                        <TerminalCode animation={false}>
                          <span className="inline-flex items-center gap-1.5 leading-0">
                            {label}
                            <Icon className={cn("w-4 h-4", color)} />
                          </span>
                        </TerminalCode>
                      </div>
                      {testCaseResult?.isPublic && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                              <TestCasesResultsDisplayLabel>
                                Entrada (input):
                              </TestCasesResultsDisplayLabel>
                              <TerminalCode animation={false}>
                                {testCaseResult?.input || ""}
                              </TerminalCode>
                            </div>
                            <div className="flex flex-col gap-1">
                              <TestCasesResultsDisplayLabel>
                                Saída do seu código:
                              </TestCasesResultsDisplayLabel>
                              <TerminalCode
                                className="h-full"
                                animation={false}
                              >
                                {testCaseResult?.output || ""}
                              </TerminalCode>
                            </div>
                            <div className="flex flex-col gap-1">
                              <TestCasesResultsDisplayLabel>
                                Saída Esperada:
                              </TestCasesResultsDisplayLabel>
                              <TerminalCode
                                className="h-full"
                                animation={false}
                              >
                                {testCaseResult?.expectedOutput || ""}
                              </TerminalCode>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Tabs.Content>
                );
              })}
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
