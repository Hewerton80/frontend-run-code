# hook-extract-form-logic: Toda Lógica de Formulário em `use<Component>.ts`

## Prioridade: HIGH

## Explicação

Componentes de formulário nunca devem conter lógica de negócio inline. Todo o estado,
efeitos, callbacks e chamadas de hook do formulário devem viver no hook local
`use<NomeComponente>.ts`, dentro da mesma pasta do componente.

O componente (`index.tsx`) apenas consome o hook e renderiza JSX.

## Exemplo Incorreto

```tsx
// ❌ CouponsForm/index.tsx — lógica embutida no componente
export function CouponsForm({ actionForm }: CouponsFormProps) {
  const { coupomFormSchemaMethods } = useCoupomFormSchema();
  const { updateCoupon } = useUpdateCoupon();
  const { coupon } = useFetchCouponById(params?.id);

  useEffect(() => {
    if (coupon) {
      coupomFormSchemaMethods.reset({ description: coupon.description });
    }
  }, [coupon]);

  const handleSubmit = async () => {
    // ... 50 linhas de lógica de submit
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Exemplo Correto

```ts
// ✅ CoupomForm/useCouponForm.ts — toda lógica aqui
import { useCoupomFormSchema } from "../../schema/coupomFormSchema";
import { useUpdateCoupon } from "../../hooks/useUpdateCoupon";
import { useFetchCouponById } from "../../hooks/useFetchCouponById";
import { useCallback, useEffect, useMemo } from "react";

interface UseCouponFormProps {
  actionForm: "create" | "edit" | "view";
}

export const useCouponForm = ({ actionForm }: UseCouponFormProps) => {
  const { coupomFormSchemaMethods } = useCoupomFormSchema();

  const {
    watch: watchCouponFormValues,
    reset: resetCouponFormValues,
    formState: formStateCoupomValues,
    getValues: getCouponFormValues,
    trigger: triggerCouponFormErrors,
  } = useMemo(() => coupomFormSchemaMethods, [coupomFormSchemaMethods]);

  const isEditActionCoupom = useMemo(() => actionForm === "edit", [actionForm]);
  const { updateCoupon } = useUpdateCoupon();
  const { coupon } = useFetchCouponById(params?.id);

  // efeitos, callbacks, submit handler...

  return {
    coupon,
    coupomFormSchemaMethods,
    isEditActionCoupom,
    handleSubmitCoupom,
    // ... outros valores necessários para o JSX
  };
};
```

```tsx
// ✅ CoupomForm/index.tsx — só renderização
import { useCouponForm } from "./useCouponForm";
import { Controller } from "react-hook-form";
import { useMemo } from "react";

export function CouponsForm({ actionForm }: CouponsFormProps) {
  const {
    coupon,
    coupomFormSchemaMethods,
    isEditActionCoupom,
    handleSubmitCoupom,
  } = useCouponForm({ actionForm });

  const { control } = useMemo(
    () => coupomFormSchemaMethods,
    [coupomFormSchemaMethods],
  );

  return (
    <form>
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl errorMessage={fieldState.error?.message}>
            <Input {...field} />
          </FormControl>
        )}
      />
    </form>
  );
}
```

## Contexto

- A pasta do componente tem sempre dois arquivos: `index.tsx` (JSX) e `use<Componente>.ts` (lógica).
- O hook local pode importar qualquer hook de dados do módulo (`useFetchCouponById`,
  `useUpdateCoupon`, etc.) — o componente nunca importa diretamente.
- Esse padrão segue a regra `arch-no-tanstack-in-components` da skill `tanstack-query-best-practices`:
  componentes nunca importam de `@tanstack/react-query` diretamente.
- Referência: `src/modules/coupon/components/CoupomForm/`
