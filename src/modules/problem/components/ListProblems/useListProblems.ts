import { useGetProblems } from "../../hooks/useGetProblems";

export const useListProblems = () => {
  const { isProblemsLoading, problems, problemsError, refetchProblems } =
    useGetProblems();
  return {
    isProblemsLoading,
    problems,
    problemsError,
    refetchProblems,
  };
};
