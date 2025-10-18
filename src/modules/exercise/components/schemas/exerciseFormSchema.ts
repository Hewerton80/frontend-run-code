import { CONSTANTS } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const { VALIDATION } = CONSTANTS;
export const exerciseFormSchema = z.object({
  title: z.string().min(1, VALIDATION.REQUIRED_FIELD),
  description: z.string().min(1, VALIDATION.REQUIRED_FIELD),
  // categoryId: z.string().min(1, VALIDATION.REQUIRED_FIELD),
  // difficulty: z.string().min(1, VALIDATION.REQUIRED_FIELD),
  testCases: z
    .array(
      z.object({
        input: z.array(z.string()).min(1, VALIDATION.REQUIRED_FIELD),
        expectedOutput: z.string().min(1, VALIDATION.REQUIRED_FIELD),
        isPublic: z.boolean(),
      })
    )
    .min(3, "Deve conter ao menos 3 casos de teste")
    .refine(
      (testCases) => {
        // console.log("testCases", testCases);
        return (
          testCases.some((testCase) => testCase.isPublic) &&
          testCases.some((testCase) => !testCase.isPublic)
        );
      },
      {
        message: "Deve conter ao menos um caso de teste público e um privado",
      }
    ),
});

export type ExerciseFormSchema = z.infer<typeof exerciseFormSchema>;

export const useExerciseFormSchema = () => {
  const exerciseFormSchemaDefaultValues = useMemo<ExerciseFormSchema>(
    () => ({
      title: "",
      description: "",
      // categoryId: "",
      // difficulty: "",
      testCases: [{ input: [], expectedOutput: "", isPublic: true }],
    }),
    []
  );

  const exerciseFormSchemaMethods = useForm<ExerciseFormSchema>({
    defaultValues: exerciseFormSchemaDefaultValues,
    mode: "onTouched",
    resolver: zodResolver(exerciseFormSchema),
  });

  return { exerciseFormSchemaMethods, exerciseFormSchemaDefaultValues };
};
