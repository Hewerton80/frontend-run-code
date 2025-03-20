import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useGetProblems = () => {
  const { apiBase } = useAxios();
  const {
    data: problems,
    isFetching: isProblemsLoading,
    error: problemsError,
  } = useQuery({
    queryFn: () => apiBase.get("/problem").then((res) => res.data),
    queryKey: ["problems"],
    enabled: true,
  });

  return {
    problems,
    isProblemsLoading,
    problemsError,
  };
};
