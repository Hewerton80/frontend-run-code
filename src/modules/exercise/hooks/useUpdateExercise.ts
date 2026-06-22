import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { ICreateExerciseBody } from "./useCreateExercise";

export type IUpdateExerciseBody = Partial<ICreateExerciseBody>;

/**
 * Mutation para atualização de um exercício existente.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useUpdateExercise = (exerciseUuId: string) => {
  const { apiBase } = useAxios();

  const { mutate: updateExercise, isPending: isUpdatingExercise } = useMutation(
    {
      mutationFn: (body: IUpdateExerciseBody) =>
        apiBase.patch(`/exercise/${exerciseUuId}`, body),
      retry: 0,
    },
  );

  return { updateExercise, isUpdatingExercise };
};
