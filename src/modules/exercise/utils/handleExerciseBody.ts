import { removeEmptyKeys } from "@/utils/queryParams";
import { ExerciseFormSchema } from "../components/schemas/exerciseFormSchema";
import { ExerciseStatus } from "../exerciseTypes";
import { ICreateExerciseBody } from "../hooks/useCreateExercise";
import { IUpdateExerciseBody } from "../hooks/useUpdateExercise";

export const handleCreateExeciseBody = (
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

export const handleUpdateExerciseBody = (
  exerciseFormData: Partial<ExerciseFormSchema>,
  status: ExerciseStatus,
): IUpdateExerciseBody => {
  const updateBody: IUpdateExerciseBody = {
    status: status,
    title: exerciseFormData.title?.trim(),
    description: exerciseFormData.description?.trim(),
    testCases: exerciseFormData?.testCases?.map((testCase) => ({
      input: testCase.input?.trim(),
      expectedOutput: testCase.expectedOutput?.trim(),
      isPublic: testCase.isPublic,
    })),
  };
  return removeEmptyKeys(updateBody);
};
