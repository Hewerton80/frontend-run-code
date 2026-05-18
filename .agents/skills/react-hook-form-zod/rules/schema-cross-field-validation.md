# schema-cross-field-validation: Use `.refine()` para Validações Entre Campos

## Prioridade: CRITICAL

## Explicação

Quando a validade de um campo depende do valor de outro, use `.refine()` **encadeado no schema raiz** (não dentro do campo individual). Cada `.refine()` recebe o objeto inteiro e deve apontar o erro para o campo correto via `path`.

Isso mantém a lógica de validação cruzada centralizada no schema e garante que o React Hook Form saiba exatamente em qual campo exibir o erro.

## Exemplo Incorreto

```ts
// ❌ Validação cruzada feita no hook do componente, fora do schema
export const useCouponForm = () => {
  const { coupomFormSchemaMethods } = useCoupomFormSchema();

  const handleSubmit = () => {
    const { isSuperPromo, superPromoInitDate } =
      coupomFormSchemaMethods.getValues();
    // ❌ validação manual fora do schema — não aparece no formState.errors
    if (isSuperPromo && !superPromoInitDate) {
      alert("Data obrigatória");
    }
  };
};
```

## Exemplo Correto

```ts
// ✅ Todos os refinements encadeados no schema raiz
export const coupomFormSchema = z
  .object({
    isSuperPromo: z.boolean(),
    superPromoInitDate: z.string().optional().nullable(),
    superPromoFinalDate: z.string().optional().nullable(),
    redeemsHasLimit: z.boolean(),
    limit_of_redeems: z.number().optional().nullable(),
  })

  // Campo obrigatório quando isSuperPromo = true
  .refine(
    ({ isSuperPromo, superPromoInitDate }) =>
      isSuperPromo ? Boolean(superPromoInitDate) : true,
    {
      message: ERROR_MESSAGES.REQUIRED_FIELDS,
      path: ["superPromoInitDate"], // erro aparece neste campo
    },
  )

  // Formato de data válido
  .refine(
    ({ isSuperPromo, superPromoInitDate }) =>
      isSuperPromo && superPromoInitDate
        ? String(superPromoInitDate).match(regex.dateFormat)
        : true,
    {
      message: ERROR_MESSAGES.INVALID_DATE,
      path: ["superPromoInitDate"],
    },
  )

  // Data final >= data inicial
  .refine(
    ({ isSuperPromo, superPromoInitDate, superPromoFinalDate }) => {
      if (!isSuperPromo || !superPromoInitDate || !superPromoFinalDate)
        return true;
      const start = getISOFormatDate(superPromoInitDate as string);
      const end = getISOFormatDate(superPromoFinalDate as string);
      return new Date(end as string) >= new Date(start as string);
    },
    {
      message: '"Fim" não pode ser menor que "Início"',
      path: ["superPromoFinalDate"],
    },
  )

  // Limite obrigatório quando redeemsHasLimit = true
  .refine(
    ({ redeemsHasLimit, limit_of_redeems }) =>
      redeemsHasLimit ? Boolean(limit_of_redeems) : true,
    { message: ERROR_MESSAGES.REQUIRED_FIELDS, path: ["limit_of_redeems"] },
  );
```

## Contexto

- **Sempre** use `path` para direcionar o erro ao campo correto — sem `path`, o erro aparece
  na raiz do formulário e não é exibido por nenhum `FormControl`.
- Encadeie quantos `.refine()` forem necessários; cada validação cruzada vira um `.refine()` separado.
- A ordem importa: as validações são executadas em sequência; coloque as de "campo obrigatório"
  antes das de "formato" para mensagens de erro na ordem correta.
- Para schemas de filtro (não de create/edit), o mesmo padrão se aplica — ver
  `src/modules/coupon/schema/couponRatingFormFilterSchema.ts`.
- Referência: `src/modules/coupon/schema/coupomFormSchema.ts`
