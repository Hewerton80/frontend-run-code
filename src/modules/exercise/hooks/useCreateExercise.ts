import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { ExerciseStatus } from "../exerciseTypes";

interface ICreateExerciseTestCaseBody {
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export interface ICreateExerciseBody {
  title: string;
  description: string;
  difficulty: number;
  status: ExerciseStatus;
  testCases: ICreateExerciseTestCaseBody[];
  // categoryId: string;
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
        apiBase.post<{ id: string }>("/exercise", body).then((res) => res.data),
      retry: 0,
    },
  );

  return { createExercise, isCreatingExercise };
};
