# hook-watch-subscription: Use `watch()` com Subscribe/Unsubscribe para Efeitos Entre Campos

## Prioridade: HIGH

## Explicação

Quando um campo precisa reagir à mudança de outro (ex: limpar `limit_of_redeems` quando
`redeemsHasLimit` volta a `false`), use a forma de assinatura do `watch()` dentro de um
`useEffect` com cleanup — não `useEffect` observando o valor do campo diretamente.

A assinatura `watch(callback)` do React Hook Form usa um padrão pub/sub interno que evita
re-renders desnecessários: o callback é chamado somente quando um campo muda, e o `useEffect`
não precisa redisparar.

## Exemplo Incorreto

```ts
// ❌ useEffect assistindo o valor — causa re-renders extras
const redeemsHasLimit = watchCouponFormValues("redeemsHasLimit");

useEffect(() => {
  if (!redeemsHasLimit) {
    setCouponFormValues("limit_of_redeems", null);
  }
}, [redeemsHasLimit, setCouponFormValues]);
// Problema: toda mudança em redeemsHasLimit re-executa o efeito,
// e o componente precisa se "inscrever" em redeemsHasLimit como estado.
```

## Exemplo Correto

```ts
// ✅ Assinatura de watch com cleanup — sem re-render extra
useEffect(() => {
  const subscription = watchCouponFormValues((value, { name }) => {
    // name indica qual campo mudou — filtre para agir apenas no que importa
    if (name === "redeemsHasLimit" && value?.redeemsHasLimit === false) {
      setCouponFormValues("limit_of_redeems", null);
    }
  });
  return () => subscription.unsubscribe(); // limpa ao desmontar
}, [watchCouponFormValues, setCouponFormValues]);
```

**Múltiplos efeitos colaterais em uma única assinatura:**

```ts
useEffect(() => {
  const subscription = watchCouponFormValues((value, { name }) => {
    if (name === "redeemsHasLimit" && !value?.redeemsHasLimit) {
      setCouponFormValues("limit_of_redeems", null);
    }
    if (name === "isSuperPromo" && !value?.isSuperPromo) {
      setCouponFormValues("superPromoInitDate", "");
      setCouponFormValues("superPromoFinalDate", "");
    }
  });
  return () => subscription.unsubscribe();
}, [watchCouponFormValues, setCouponFormValues]);
```

## Contexto

- O `watch` estabilizado via `useMemo` (ver `hook-memo-form-methods`) como dependência do
  `useEffect` não causa loop infinito — sua referência não muda entre renders.
- Use `name` para filtrar qual campo disparou a mudança antes de agir.
- Esse padrão substitui todo caso de `useEffect([someFieldValue])` que apenas chama
  `setValue` em resposta — é mais eficiente e idiomático ao React Hook Form.
- Referência: `src/modules/coupon/components/CoupomForm/useCouponForm.ts`
