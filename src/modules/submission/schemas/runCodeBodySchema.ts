import z from "zod";
import { CONSTANTS } from "@/utils/constants";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";

const { REQUIRED_FIELD } = CONSTANTS.VALIDATION;

export const runCodeBodySchema = z.object({
  sourceCode: z.string().min(1, REQUIRED_FIELD),
  language: z.refine((language) => !!languagesConfig?.[language as string], {
    message: `Invalid language. Avaliable languages: ${Object.keys(
      languagesConfig,
    ).join(", ")}`,
  }),
  inputValues: z.array(z.string({ error: REQUIRED_FIELD }), {
    error: REQUIRED_FIELD,
  }),
});

export type RunCodeBody = z.infer<typeof runCodeBodySchema>;
