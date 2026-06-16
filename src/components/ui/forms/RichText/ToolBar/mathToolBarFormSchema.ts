import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONSTANTS } from "@/utils/constants";

const { VALIDATION } = CONSTANTS;

// 1. Schema Zod
export const mathToolBarFormSchema = z.object({
  latex: z.string().min(1, { message: VALIDATION.REQUIRED_FIELD }),
});

// 2. Tipo inferido
export type IMathToolBarFormSchema = z.infer<typeof mathToolBarFormSchema>;

// 3. Hook que instancia o useForm
export const useMathToolBarFormSchema = () => {
  const mathToolBarFormSchemaMethods = useForm<IMathToolBarFormSchema>({
    defaultValues: { latex: "" },
    mode: "onTouched",
    resolver: zodResolver(mathToolBarFormSchema),
  });

  return { mathToolBarFormSchemaMethods };
};
