import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface CreateExerciseTesCaseBody {
  input: string[];
  expectedOutput: string;
  isPublic: boolean;
}

interface CreateExerciseBody {
  title: string;
  description: string;
  difficulty: number;
  testCases: CreateExerciseTesCaseBody[];
  categoryId: string;
}

export const useCraeteExercise = () => {
  const { apiBase } = useAxios();

  const { mutate: createExercise, isPending: isCreatingExercise } = useMutation(
    {
      mutationFn: (createExerciseBody: CreateExerciseBody) =>
        apiBase.post("/exercises", createExerciseBody),
    }
  );

  return { createExercise, isCreatingExercise };
};
