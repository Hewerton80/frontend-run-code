import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IProblem, ProblemQueryKey } from "../problemTypes";

interface ProblemParams {
  problemId: string;
  classroomId?: string;
  listId?: string;
}

export const useGetProblem = ({
  problemId,
  classroomId,
  listId,
}: ProblemParams) => {
  const { apiBase } = useAxios();

  const {
    data: problem,
    isFetching: isLoadingProblem,
    error: problemError,
    refetch: refetchProblem,
  } = useQuery({
    queryKey: [ProblemQueryKey.PROBLEM, problemId, classroomId, listId],
    queryFn: async () => {
      let url = `/exercise/${problemId}`;
      if (classroomId && listId) {
        url += `/classroom/${classroomId}/list/${listId}`;
      }
      return apiBase.get<IProblem>(url).then((res) => res.data);
    },
    enabled: true,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return {
    problem,
    isLoadingProblem,
    problemError,
    refetchProblem,
  };
};
