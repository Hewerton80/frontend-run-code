import {
  ExecutionEngineParams,
  ExecutionResult,
} from "../executionEnginesType";
import { SubmissionStatus } from "@/modules/submission/submissionType";
import { parsePyErrror } from "./parsePythonError";

export const pythonExecutionEngine = async ({
  code,
  input,
  timeLimit = 10000,
}: ExecutionEngineParams): Promise<ExecutionResult> => {
  return new Promise<ExecutionResult>((resolve) => {
    // cria um novo worker para cada execução
    const worker = new Worker(new URL("./pythonWorker.js", import.meta.url), {
      type: "module",
    });

    console.log("Worker criado", worker);

    let timedOut = false;

    // timeout para interromper
    const timeoutId = setTimeout(() => {
      timedOut = true;
      worker.postMessage({ cmd: "interrupt" });
      // força encerrar depois de mais 100ms
      setTimeout(() => {
        worker.terminate();
        resolve({
          output: "Execução interrompida por timeout",
          runtime: timeLimit,
          memory: 0,
          status: SubmissionStatus.TIME_LIMIT_EXCEEDED,
        });
      }, 100);
    }, timeLimit);

    worker.onmessage = (e) => {
      const { type, data } = e.data;
      console.log("Worker message:", { type, data });
      if (type === "ready") {
        // dispara execução
        worker.postMessage({ cmd: "run", code, input });
      }

      if (type === "stdout") {
        if (!timedOut) {
          clearTimeout(timeoutId);
          worker.terminate();
          resolve({
            output: data?.toString(),
            runtime: timeLimit / 2,
            memory: 50,
            status: SubmissionStatus.ACCEPTED,
          });
        }
      }

      if (type === "stderr") {
        if (!timedOut) {
          clearTimeout(timeoutId);
          worker.terminate();
          resolve({
            output: parsePyErrror(data?.toString()),
            runtime: timeLimit / 2,
            memory: 50,
            status: SubmissionStatus.RUNTIME_ERROR,
          });
        }
      }

      if (type === "done") {
        if (!timedOut) {
          clearTimeout(timeoutId);
          worker.terminate();
          resolve({
            output: data?.toString(),
            runtime: timeLimit / 2,
            memory: 50,
            status: SubmissionStatus.ACCEPTED,
          });
        }
      }

      if (type === "error") {
        if (!timedOut) {
          clearTimeout(timeoutId);
          worker.terminate();
          resolve({
            output: parsePyErrror(data?.message?.toString()),
            runtime: timeLimit / 2,
            memory: 50,
            status:
              data?.type === "SyntaxError"
                ? SubmissionStatus.RUNNING
                : SubmissionStatus.UNKNOWN_ERROR,
          });
        }
      }
    };
  });
};

// status:
//   data?.type === "SyntaxError"
//     ? SubmissionStatus.RUNNING
//     : SubmissionStatus.UNKNOWN_ERROR,
