import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IProblem, ProblemQueryKey } from "../problemTypes";
import { dalay } from "@/utils/dalay";

export const useGetProblemsByClassroomList = ({
  classroomId,
  listId,
}: {
  classroomId: string;
  listId: string;
}) => {
  const { apiBase } = useAxios();
  const {
    data: problems,
    error: errorProblems,
    isLoading: isLoadingProblems,
    refetch: refetchProblems,
  } = useQuery({
    queryKey: [ProblemQueryKey.PROBLEMS_BY_CLASSROOM, classroomId, listId],
    queryFn: async () => {
      const { data } = await apiBase.get<IProblem[]>(
        `/problem/classroom/${classroomId}/list/${listId}`
      );
      return data || ([] as IProblem[]);
    },
  });

  return {
    problems,
    errorProblems,
    isLoadingProblems,
    refetchProblems,
  };
};
