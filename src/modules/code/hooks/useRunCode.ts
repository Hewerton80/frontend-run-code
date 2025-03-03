import { useAxios } from "@/hooks/useAxios";
import { RunCodeBody } from "@/modules/schemas/runCodeBodySchema";
import { useMutation } from "@tanstack/react-query";

interface RunCodeBodyResponse {
  output: string;
}

interface RunCodeBodyErrorResponse {
  description?: string;
}

export const useRunCode = () => {
  const { apiBase } = useAxios();

  const {
    mutate: runCode,
    isPending: isRunningCode,
    data: runCodeResponse,
    error: runCodeError,
  } = useMutation({
    mutationFn: (runCodeBodySchema: RunCodeBody) =>
      apiBase
        .post<RunCodeBodyResponse>("/code/run", runCodeBodySchema)
        .then((res) => res.data),
  });

  const getHandleError = () => {
    if (!runCodeError) return null;
    const handleError = (runCodeError as any)?.response
      ?.data as RunCodeBodyErrorResponse;
    console.log(handleError);
    if (handleError?.description) return handleError;
    return { description: "Something went wrong 😭" };
  };

  return {
    runCode,
    isRunningCode,
    runCodeResponse,
    runCodeError: getHandleError(),
  };
};
