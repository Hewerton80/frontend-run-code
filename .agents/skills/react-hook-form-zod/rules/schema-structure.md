# schema-structure: 3 Exports por Arquivo de Schema

## Prioridade: CRITICAL

## Explicação

Cada arquivo `schema/<entidade>FormSchema.ts` deve exportar exatamente três itens:

1. **O schema Zod** — objeto com as regras de validação
2. **O tipo inferido** — derivado do schema com `z.infer<typeof schema>`
3. **O hook `use<Entidade>FormSchema`** — instancia e retorna o `useForm` com `zodResolver`

Isso centraliza toda a configuração do formulário em um único lugar: schema, tipagem e instância do `useForm` com `defaultValues`, `mode` e `resolver`.

## Exemplo Incorreto

```ts
// ❌ schema e tipo em um arquivo, useForm espalhado no componente ou hook local
// schema/couponSchema.ts
import { z } from "zod";
export const couponSchema = z.object({ name: z.string() });
export type ICouponSchema = z.infer<typeof couponSchema>;

// components/CouponForm/useCouponForm.ts — useForm criado aqui
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponSchema, ICouponSchema } from "../../schema/couponSchema";

const methods = useForm<ICouponSchema>({
  resolver: zodResolver(couponSchema),
  mode: "onTouched",
  defaultValues: { name: "" },
});
```

O `useForm` se torna responsabilidade do consumidor, que pode configurar `mode` ou `defaultValues` de forma diferente em cada uso.

## Exemplo Correto

```ts
// ✅ schema/coupomFormSchema.ts — os 3 exports juntos
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONSTANTS } from "@/utils/constants";

const { ERROR_MESSAGES } = CONSTANTS;

// 1. Schema Zod
export const coupomFormSchema = z.object({
  description: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELDS }),
  limit_of_guests: z
    .number()
    .min(1, { message: ERROR_MESSAGES.REQUIRED_FIELDS })
    .nullable(),
  isSuperPromo: z.boolean(),
  superPromoInitDate: z.string().optional().nullable(),
});

// 2. Tipo inferido
export type ICouponFormSchema = z.infer<typeof coupomFormSchema>;

// 3. Hook que instancia o useForm
export const useCoupomFormSchema = () => {
  const coupomFormSchemaMethods = useForm<ICouponFormSchema>({
    defaultValues: {
      description: "",
      limit_of_guests: null,
      isSuperPromo: false,
      superPromoInitDate: "",
    },
    mode: "onTouched",
    resolver: zodResolver(coupomFormSchema),
  });

  return { coupomFormSchemaMethods };
};
```

O hook local do componente apenas consome:

```ts
// ✅ components/CoupomForm/useCouponForm.ts
import { useCoupomFormSchema } from "../../schema/coupomFormSchema";

export const useCouponForm = () => {
  const { coupomFormSchemaMethods } = useCoupomFormSchema();
  // ...
};
```

## Contexto

- Sempre use `mode: 'onTouched'` — valida ao sair do campo, não ao digitar (menos ruído).
- Mensagens de erro vêm de `CONSTANTS.ERROR_MESSAGES`, nunca strings avulsas.
- Exporte as constantes de `defaultValues` complexas separadamente se precisar reutilizá-las
  (ex: `defaultCouponAvailableSchedules`).
- O nome do hook segue o padrão `use<Entidade>FormSchema` e o retorno é `{ <entidade>FormSchemaMethods }`.
- Referência: `src/modules/coupon/schema/coupomFormSchema.ts`
