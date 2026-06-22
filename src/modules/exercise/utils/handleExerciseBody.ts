import { ExerciseFormSchema } from "../components/schemas/exerciseFormSchema";
import { ExerciseStatus } from "../exerciseTypes";
import { ICreateExerciseBody } from "../hooks/useCreateExercise";

export const handleExeciseBody = (
  exerciseFormData: ExerciseFormSchema,
  status: ExerciseStatus,
): ICreateExerciseBody => {
  return {
    status,
    title: exerciseFormData.title.trim(),
    description: exerciseFormData.description.trim(),
    difficulty: 1, // TODO: adicionar campo de dificuldade no formulário
    testCases: exerciseFormData.testCases.map((testCase) => ({
      input: testCase.input.trim(),
      expectedOutput: testCase.expectedOutput.trim(),
      isPublic: testCase.isPublic,
    })),
  };
};
