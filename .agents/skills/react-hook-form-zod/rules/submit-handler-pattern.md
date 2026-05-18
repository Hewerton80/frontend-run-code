# submit-handler-pattern: Padrão Completo do Submit Handler

## Prioridade: MEDIUM

## Explicação

O submit handler de um formulário no projeto segue uma sequência fixa:

1. **Acionar validação** com `trigger()`
2. **Verificar `formState.isValid`** — se inválido, navegar para o primeiro erro e abortar
3. **Preparar o payload** — transformar os valores do formulário para o formato da API
   (converter `File` para base64, formatar datas, etc.)
4. **Modo edição: filtrar apenas campos alterados** com `getOnlyDirtyFields`
5. **Chamar a mutation** com callbacks `onSuccess`/`onError`
6. **No sucesso: atualizar o cache** com `updateEntityInCache` em vez de invalidar a lista inteira

## Exemplo Incorreto

```ts
// ❌ Submit sem ativar validação manual — formState pode estar desatualizado
const handleSubmit = coupomFormSchemaMethods.handleSubmit(async (values) => {
  await updateCoupon({ id, ...values }); // envia todos os campos no edit
  queryClient.invalidateQueries({ queryKey: [CoupomQueryKeys.Coupons] }); // re-fetch a lista toda
});
```

## Exemplo Correto

```ts
export const useCouponForm = ({ actionForm }: UseCouponFormProps) => {
  const { coupomFormSchemaMethods } = useCoupomFormSchema();
  const {
    getValues: getCouponFormValues,
    trigger: triggerCouponFormErrors,
    formState: formStateCoupomValues,
  } = useMemo(() => coupomFormSchemaMethods, [coupomFormSchemaMethods]);

  const [isSubmitingCoupon, setIsSubmitingCoupon] = useState(false);
  const isEditActionCoupom = useMemo(() => actionForm === "edit", [actionForm]);
  const { showAlert } = useAlertModal();
  const { updateCoupon } = useUpdateCoupon();
  const { createCoupon } = useCreateCoupon();

  // Passo 3 — preparar o payload (async por causa dos File → base64)
  const getHandledCoupon = useCallback(
    async (
      formValues: ICouponFormSchema & { status: string },
    ): Promise<ICoupomBody> => {
      const payload: ICoupomBody = {
        description: formValues.description,
        limit_of_guests: formValues.limit_of_guests ?? null,
        isSuperPromo: formValues.isSuperPromo || false,
        status: formValues.status,
        limit_of_redeems: formValues.redeemsHasLimit
          ? formValues.limit_of_redeems
          : null,
        user_store_id: formValues.userStoreOption?.value,
      };

      // Converte File → base64 apenas se for um arquivo novo
      if (isFile(formValues.banner1)) {
        payload.banner1 = (await toBase64(
          formValues.banner1 as File,
        )) as string;
      }

      if (formValues.isSuperPromo) {
        payload.superPromoInitDate = `${getISOFormatDate(formValues.superPromoInitDate as string)} 00:00:00`;
        payload.superPromoFinalDate = `${getISOFormatDate(formValues.superPromoFinalDate as string)} 23:59:59`;
      } else {
        payload.superPromoInitDate = null;
        payload.superPromoFinalDate = null;
      }

      return payload;
    },
    [],
  );

  const handleSubmitCoupom = useCallback(
    async (status: CoupomStatus) => {
      try {
        setIsSubmitingCoupon(true);

        // Passo 1 — acionar validação
        triggerCouponFormErrors();

        // Passo 2 — verificar e redirecionar para o primeiro erro
        if (!formStateCoupomValues.isValid) {
          const firstError = Object.keys(formStateCoupomValues.errors)[0];
          if (firstError) navigate(`#${firstError}`, { replace: true });
          setIsSubmitingCoupon(false);
          showAlert({
            variant: "danger",
            title: "Erro de validação",
            description: "Verifique se todos os campos estão corretos!",
          });
          return;
        }

        const onSuccess = () => {
          toast("Salvo com sucesso!");
          setIsSubmitingCoupon(false);
          navigate("/coupons");
        };
        const onError = (error: any) => {
          setIsSubmitingCoupon(false);
          const message = error?.response?.data?.message || "Erro ao salvar";
          showAlert({
            variant: "danger",
            title: "Erro ao Salvar",
            description: message,
          });
        };

        // Passo 3 — preparar payload
        const payload = await getHandledCoupon({
          ...getCouponFormValues(),
          status,
        });

        if (isEditActionCoupom) {
          // Passo 4 — filtrar somente campos alterados
          const dirtyPayload = getOnlyDirtyFields(
            payload,
            formStateCoupomValues.dirtyFields,
          );

          // Passo 5 — mutation de edição
          updateCoupon(
            { id: coupomId, ...dirtyPayload, status },
            {
              onError,
              onSuccess: () => {
                // Passo 6 — atualizar cache do item (sem refetch da lista)
                updateCouponInCache(coupomId!, { ...dirtyPayload, status });
                onSuccess();
              },
            },
          );
          return;
        }

        // Passo 5 — mutation de criação
        createCoupon(payload, {
          onError,
          onSuccess: () => {
            onSuccess();
            forceRefetchCachedCoupons(); // lista precisa ser recarregada no create
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [
      coupomId,
      formStateCoupomValues.isValid,
      formStateCoupomValues.errors,
      formStateCoupomValues.dirtyFields,
      isEditActionCoupom,
      getHandledCoupon,
      navigate,
      showAlert,
      createCoupon,
      triggerCouponFormErrors,
      getCouponFormValues,
      updateCoupon,
    ],
  );

  return { handleSubmitCoupom, isSubmitingCoupon, coupomFormSchemaMethods };
};
```

## Contexto

- `getOnlyDirtyFields(formValues, dirtyFields)` está em `src/utils/hookFormHelpers.ts` —
  retorna apenas os campos que foram tocados pelo usuário.
- `updateCouponInCache` está em `src/modules/coupon/utils/updateCouponInCache.ts` — usa
  `setItemInCache` para atualizar só o item no cache, sem invalidar a lista inteira.
- `forceRefetchCachedCoupons` invalida a lista apenas no **create** — no edit, a lista não
  muda, somente o item.
- `isSubmitingCoupon` é um `useState` local (não `isPending` da mutation) porque o submit
  pode envolver múltiplas operações async (conversão de base64) antes da chamada HTTP.
- O `getHandledCoupon` é um `useCallback` separado para manter o `handleSubmitCoupom`
  legível e suas dependências gerenciáveis.
- Referência: `src/modules/coupon/components/CoupomForm/useCouponForm.ts`
