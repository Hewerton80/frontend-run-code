import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface ICreateExerciseTestCaseBody {
  input: string[];
  expectedOutput: string;
  isPublic: boolean;
}

export interface ICreateExerciseBody {
  title: string;
  description: string;
  difficulty: number;
  testCases: ICreateExerciseTestCaseBody[];
  categoryId: string;
}

/**
 * Mutation para criação de um novo exercício.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useCreateExercise = () => {
  const { apiBase } = useAxios();

  const { mutate: createExercise, isPending: isCreatingExercise } = useMutation(
    {
      mutationFn: (body: ICreateExerciseBody) =>
        apiBase.post("/exercises", body),
      retry: 0,
    },
  );

  return { createExercise, isCreatingExercise };
};

/**
 * @deprecated Use `useCreateExercise` diretamente.
 * Alias para compatibilidade retroativa (typo corrigido: useCraeteExercise → useCreateExercise).
 */
export const useCraeteExercise = useCreateExercise;
