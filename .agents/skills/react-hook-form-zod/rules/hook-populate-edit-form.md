# hook-populate-edit-form: Use `reset()` em `useEffect` para Popular o Formulário no Modo Edição

## Prioridade: HIGH

## Explicação

No modo edição, o formulário precisa ser populado com os dados da entidade já existente.
Use `reset()` dentro de um `useEffect` que observa quando a entidade carrega do cache/API.

Não use `setValue` campo a campo — `reset()` substitui todos os `defaultValues` de uma
vez, limpa o estado de `isDirty`/`dirtyFields` corretamente e evita flickering.

## Exemplo Incorreto

```ts
// ❌ setValue campo a campo — não reseta isDirty, ordem importa, verboso
useEffect(() => {
  if (coupon) {
    setCouponFormValues("description", coupon.description);
    setCouponFormValues("limit_of_guests", coupon.limit_of_guests);
    setCouponFormValues("isSuperPromo", coupon.isSuperPromo);
    // ... um setValue para cada campo
  }
}, [coupon]);

// ❌ reset sem condição — sobrescreve valores enquanto o usuário digita
useEffect(() => {
  resetCouponFormValues({ description: coupon?.description ?? "" });
}, [resetCouponFormValues]); // sem coupon como dependência — roda na montagem
```

## Exemplo Correto

```ts
// ✅ reset() uma única vez quando o dado carrega, guardado por coupomId + coupon
useEffect(() => {
  if (coupomId && coupon) {
    resetCouponFormValues({
      description: coupon.description || "",
      rules: coupon.rules || "",
      userStoreOption: coupon.userStore?.id
        ? ({
            value: coupon.userStore.id,
            label: coupon.userStore.fantasy_name,
          } as SelectOption)
        : null,
      redeemsHasLimit: Boolean(coupon.limit_of_redeems),
      limit_of_redeems: coupon.limit_of_redeems
        ? Number(coupon.limit_of_redeems)
        : null,
      limit_of_guests: isNumber(coupon.limit_of_guests)
        ? Number(coupon.limit_of_guests)
        : null,
      isSuperPromo: coupon.isSuperPromo,
      // Datas da API (ISO) formatadas para o padrão de exibição do campo
      superPromoInitDate: coupon.superPromoInitDate
        ? format(new Date(coupon.superPromoInitDate), "P", { locale: ptBR })
        : "",
      superPromoFinalDate: coupon.superPromoFinalDate
        ? format(new Date(coupon.superPromoFinalDate), "P", { locale: ptBR })
        : "",
      // Mantém a referência ao cupom atual para validações cruzadas no schema
      currentCoupon: coupon,
    });
  }
}, [coupomId, coupon, resetCouponFormValues]);
```

## Contexto

- Inclua `coupomId` na condição e nas dependências para garantir que o reset só acontece
  quando estamos editando (`actionForm === 'edit'`) e o dado já está disponível.
- Formate os valores conforme o que o campo espera: datas ISO viram `dd/MM/yyyy` para
  `DatePicker`, IDs viram `SelectOption` para `Select`, valores numéricos são parseados
  com `Number()`.
- `isNumber` é o type guard em `src/utils/isType.ts`.
- O `format` é do `date-fns`, com `locale: ptBR` de `date-fns/locale`.
- Referência: `src/modules/coupon/components/CoupomForm/useCouponForm.ts`
