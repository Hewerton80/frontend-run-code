# schema-file-image-fields: `z.union` para Campos de Arquivo/Imagem

## Prioridade: CRITICAL

## Explicação

Campos de upload de imagem podem conter ou uma URL string (no modo edição, quando a imagem
já existe) ou um objeto `File` (no modo criação/quando o usuário seleciona um novo arquivo).

Use `z.union([z.string(), z.any().refine(...)])` para modelar esse campo. O primeiro membro
do union aceita strings (URL já salva), e o segundo valida o `File` com os refinements de tipo
e tamanho.

## Exemplo Incorreto

```ts
// ❌ Aceita qualquer valor sem validar tipo ou tamanho
export const couponSchema = z.object({
  banner1: z.any(),
  photo: z.string().optional(),
});

// ❌ Schema separado para criação e edição — duplicação desnecessária
export const couponCreateSchema = z.object({ banner1: z.any() });
export const couponEditSchema = z.object({ banner1: z.string() });
```

## Exemplo Correto

```ts
import { z } from "zod";
import { isFile } from "@/utils/isType";
import { isValidFileSize } from "@/utils/file";
import { CONSTANTS } from "@/utils/constants";

const { ERROR_MESSAGES } = CONSTANTS;

export const coupomFormSchema = z.object({
  // Campo de imagem obrigatória — string (URL existente) OU File validado
  banner1: z.union([
    z.string().optional(),
    z
      .any()
      .refine((image) => Boolean(image), {
        message: ERROR_MESSAGES.REQUIRED_FIELDS,
      })
      .refine((image) => (image ? isFile(image) : true), {
        message: ERROR_MESSAGES.INVALID_FILE,
      })
      .refine((image) => (image ? isValidFileSize({ file: image }) : true), {
        message: ERROR_MESSAGES.INVALID_MAX_FILE,
      }),
  ]),

  // Campo de imagem opcional — pode ser string, File ou nulo
  photo: z.union([
    z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELDS }),
    z.any(),
  ]),
});
```

**Convertendo `File` para base64 no submit handler:**

```ts
// No hook do formulário, antes de enviar para a API
if (isFile(formValues.banner1)) {
  handledPayload.banner1 = (await toBase64(
    formValues.banner1 as File,
  )) as string;
}
// Se não for File (é string), deixa como está — já é uma URL
```

## Contexto

- `isFile(value)` é um type guard em `src/utils/isType.ts` que verifica `value instanceof File`.
- `isValidFileSize({ file })` está em `src/utils/file.ts` e valida o tamanho máximo permitido.
- `toBase64(file)` está em `src/utils/toBase64.ts` — converte o File para string base64 para envio.
- A conversão para base64 **nunca** acontece no schema — só no submit handler (ver `submit-handler-pattern`).
- Referência: `src/modules/coupon/schema/coupomFormSchema.ts`
