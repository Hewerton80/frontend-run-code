import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";

export interface FetchExerciseByUuIdResponse {
  submissionStats: {
    error: string | null;
    status: number;
    correctSubmissionsCount: number;
    incorrectSubmissionsCount: number;
    score: number;
    language: string;
    listId: number | null;
    classroomId: number | null;
    sourceCode: string;
    updatedAt: Date;
  };
  testCases: {
    id: number;
    exerciseUuId: string;
    input: string;
    expectedOutput: string;
    isPublic: boolean;
  }[];
  uuid: string;
  status: number;
  title: string;
  description: string;
  difficulty: number | null;
  submissionsCount: number;
  solvedSubmissionsCount: number;
  wrongUntilSolvedSubmissionsCount: number;
  createdAt: Date;
  category: {
    name: string;
    uuid: string;
  } | null;
  author: {
    avatarBgColor: string;
    avatarUrl: string;
    email: string;
    name: string;
    surname: string;
    uuid: string;
  };
}

interface IFetchExerciseParams {
  exerciseUuId: string;
  classroomUuId?: string;
  listId?: number;
}

export const useFetchExerciseByUuId = ({
  exerciseUuId,
  classroomUuId,
  listId,
}: IFetchExerciseParams) => {
  const { apiBase } = useAxios();

  const {
    data: exercise,
    isFetching: isFetchingExercise,
    error: exerciseError,
    refetch: refetchExercise,
  } = useQuery({
    //TODO colocar uma condição para saber se é do exercicio ou exerciio avulso
    queryKey: exerciseQueryKeyFactory.detail(
      exerciseUuId,
      classroomUuId,
      listId,
    ),
    queryFn: async ({ signal }) => {
      let url = `/exercise/${exerciseUuId}`;
      if (classroomUuId && listId) {
        url += `/classroom/${classroomUuId}/list/${listId}`;
      }
      return apiBase
        .get<FetchExerciseByUuIdResponse>(url, { signal })
        .then((res) => res.data);
    },

    enabled: !!exerciseUuId,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });

  return {
    exercise,
    isFetchingExercise,
    exerciseError,
    refetchExercise,
  };
};
