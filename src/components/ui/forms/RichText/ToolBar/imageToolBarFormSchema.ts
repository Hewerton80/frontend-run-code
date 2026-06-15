import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidUrl } from "@/utils/tiptapHelpers";
import { CONSTANTS } from "@/utils/constants";

const { VALIDATION } = CONSTANTS;

// 1. Schema Zod
export const imageToolBarFormSchema = z.object({
  url: z
    .string()
    .min(1, { message: VALIDATION.REQUIRED_FIELD })
    .refine(isValidUrl, { message: "URL inválida. Use o formato https://..." }),
  altText: z.string().optional(),
});

// 2. Tipo inferido
export type IImageToolBarFormSchema = z.infer<typeof imageToolBarFormSchema>;

// 3. Hook que instancia o useForm
export const useImageToolBarFormSchema = () => {
  const imageToolBarFormSchemaMethods = useForm<IImageToolBarFormSchema>({
    defaultValues: { url: "", altText: "" },
    mode: "onTouched",
    resolver: zodResolver(imageToolBarFormSchema),
  });

  return { imageToolBarFormSchemaMethods };
};
