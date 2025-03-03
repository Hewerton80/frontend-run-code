import z from 'zod';
import { CONSTANTS } from '@/utils/constants';
import { languagesConfig } from '../language/utils/languagesConfig';

const { REQUIRED_FIELD } = CONSTANTS.VALIDATION;

export const runCodeBodySchema = z.object({
  sourceCode: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD),
  language: z
    .string({ required_error: REQUIRED_FIELD })
    .refine((language) => !!languagesConfig?.[language], {
      message: `Invalid language. Avaliable languages: ${Object.keys(
        languagesConfig,
      ).join(', ')}`,
    }),
  inputValues: z.array(z.string({ required_error: REQUIRED_FIELD }), {
    required_error: REQUIRED_FIELD,
  }),
});

export type RunCodeBody = z.infer<typeof runCodeBodySchema>;
