# arch-descriptive-return-names — Nomeação Descritiva dos Retornos de Hook

**Prioridade:** CRITICAL  
**Categoria:** Architecture  
**Prefixo:** `arch-`

---

## Regra

**Nunca retorne as propriedades genéricas do TanStack Query (`mutate`, `isPending`, `data`,
`isLoading`, `error`, etc.) diretamente para o consumidor.**

Dentro do hook, renomeie cada propriedade para um nome específico do domínio antes de
retorná-la. O consumidor deve receber nomes que descrevem **o que** a operação faz,
não **como** o TanStack Query a implementa.

---

## ❌ Proibido

```ts
// useAbrirProtocolo.ts
export function useAbrirProtocolo() {
  return useMutation({
    // ← retorna diretamente
    mutationFn: (payload: OpenProtocolRequestDto) => openProtocolo(payload),
  });
}

// Consumidor — nomes genéricos, sem contexto
const { mutate, isPending } = useAbrirProtocolo();
```

```ts
// useFetchProtocolo.ts
export function useFetchProtocolo(params: GetProtocolParams) {
  return useQuery({
    // ← retorna diretamente
    queryKey: sinistrosQueryKeys.protocolo(params),
    queryFn: () => getProtocolo(params),
  });
}

// Consumidor — nomes genéricos, sem contexto
const { data, isLoading, error } = useFetchProtocolo(params);
```

---

## ✅ Correto

```ts
// useAbrirProtocolo.ts
export function useAbrirProtocolo() {
  const { mutate: openProtocol, isPending: isOpeningProtocol } = useMutation({
    mutationFn: (payload: OpenProtocolRequestDto) => openProtocolo(payload),
  });
  return { openProtocol, isOpeningProtocol };
}

// Consumidor — nomes descritivos, intenção clara
const { openProtocol, isOpeningProtocol } = useAbrirProtocolo();
```

```ts
// useFetchProtocolo.ts
export function useFetchProtocolo(params: GetProtocolParams) {
  const {
    data: protocolo,
    isLoading: isLoadingProtocolo,
    error: protocoloError,
  } = useQuery({
    queryKey: sinistrosQueryKeys.protocolo(params),
    queryFn: () => getProtocolo(params),
    select: (response) => response.data,
  });
  return { protocolo, isLoadingProtocolo, protocoloError };
}

// Consumidor — nomes descritivos, intenção clara
const { protocolo, isLoadingProtocolo } = useFetchProtocolo(params);
```

---

## Convenções de Nomenclatura

### Mutations

| Propriedade TanStack | Padrão de renomeação | Exemplo |
