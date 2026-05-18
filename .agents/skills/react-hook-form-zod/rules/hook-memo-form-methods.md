# hook-memo-form-methods: Estabilize o Retorno do `useForm` com `useMemo`

## Prioridade: HIGH

## Explicação

O hook `use<Entidade>FormSchema` retorna um objeto `methods` que é o retorno do `useForm`.
Ao desestruturar diretamente em múltiplos lugares sem `useMemo`, você cria referências
instáveis que podem causar re-renders desnecessários em `useEffect` e `useCallback`.

O padrão correto é envolver `methods` em `useMemo` antes de desestruturar, **tanto no hook
local quanto no componente**, garantindo que as funções extraídas sejam estáveis entre renders.

## Exemplo Incorreto

```ts
// ❌ Desestruturação direta — referências instáveis
export const useCouponForm = () => {
  const { coupomFormSchemaMethods } = useCoupomFormSchema();

  // Cada render cria novas referências para watch, reset, etc.
  const { watch, reset, formState, getValues, trigger } =
    coupomFormSchemaMethods;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      /* ... */
    });
    return () => subscription.unsubscribe();
  }, [watch]); // watch muda a cada render → efeito roda sempre
};
```

## Exemplo Correto

```ts
// ✅ useMemo estabiliza o objeto antes de desestruturar — no hook local
export const useCouponForm = ({ actionForm }: UseCouponFormProps) => {
  const { coupomFormSchemaMethods } = useCoupomFormSchema();

  const {
    watch: watchCouponFormValues,
    getValues: getCouponFormValues,
    setValue: setCouponFormValues,
    reset: resetCouponFormValues,
    trigger: triggerCouponFormErrors,
    formState: formStateCoupomValues,
  } = useMemo(() => coupomFormSchemaMethods, [coupomFormSchemaMethods]);

  // watch agora é estável — o efeito não re-executa a cada render
  useEffect(() => {
    const subscription = watchCouponFormValues((value, { name }) => {
      if (name === "redeemsHasLimit" && !value?.redeemsHasLimit) {
        setCouponFormValues("limit_of_redeems", null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watchCouponFormValues, setCouponFormValues]);

  return { coupomFormSchemaMethods /* ... */ };
};
```

```tsx
// ✅ useMemo novamente no componente, ao consumir o retorno do hook local
export function CouponsForm({ actionForm }: CouponsFormProps) {
  const { coupomFormSchemaMethods /* ... */ } = useCouponForm({ actionForm });

  // Extrai só o que o JSX precisa — reference estável
  const { control, watch: watchCouponFormValues } = useMemo(
    () => coupomFormSchemaMethods,
    [coupomFormSchemaMethods],
  );

  // ...
}
```

## Contexto

- Renomeie as funções ao desestruturar para deixar claro de qual formulário elas vêm
  (ex: `watch: watchCouponFormValues`). Isso evita conflito quando há múltiplos formulários
  em um mesmo hook ou componente.
- Referência: `src/modules/coupon/components/CoupomForm/useCouponForm.ts`
