# arch-url-params: Query Params de URL com Nuqs

## Prioridade: HIGH

## Explicação

Filtros, paginação e flags de modal são sincronizados com a URL via **Nuqs**.
Isso garante que o estado seja preservado ao navegar entre páginas, compartilhável via link
e compatível com o botão "voltar" do browser.

## Padrão de Uso

```ts
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

// Paginação
const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

// Filtro de status (enum)
const [status, setStatus] = useQueryState(
  "status",
  parseAsString.withDefault("Todos"),
);

// Flag booleana para modal
const [showModal, setShowModal] = useQueryState("showModal", {
  defaultValue: false,
  parse: (v) => v === "true",
});
```

## Normalização dos Params

Os valores de `useQueryState` são passados para o hook de lista, que os normaliza com
`useMemo` + `handle<Entidade>Params` antes de usar como `queryKey` e nos params da API:

```ts
// ✅ Dentro do hook de lista
const handledParams = useMemo(
  () => handleCouponsParams({ page, status, search }),
  [page, status, search],
);

const { data } = useQuery({
  queryKey: [CoupomQueryKeys.Coupons, handledParams],
  queryFn: () => fetchCoupons(handledParams),
});
```

## Contexto

- `NuqsAdapter` (react-router v7) é o primeiro provider em `src/providers/index.tsx`.
- Sem o adapter, o `useQueryState` não funciona.
- Nuqs é a **única** forma de gerenciar estado de filtro/paginação — não use `useState`
  para parâmetros de listagem que devem sobreviver a navegação.
