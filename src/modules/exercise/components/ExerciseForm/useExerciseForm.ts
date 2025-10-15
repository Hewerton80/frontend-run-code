import { useExerciseFormSchema } from "../schemas/exerciseFormSchema";

export const useExerciseForm = () => {
  const { exerciseFormSchemaMethods } = useExerciseFormSchema();
  return { exerciseFormSchemaMethods };
};
