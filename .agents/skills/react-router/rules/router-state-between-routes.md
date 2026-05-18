# router-state-between-routes

## Por que importa

Passar objetos inteiros via `location.state` entre rotas é um anti-pattern grave:

- O estado é **volátil** — desaparece se o usuário recarregar a página, abrir o link
  diretamente ou navegar via histórico do browser.
- Cria **acoplamento implícito** entre páginas: a página de destino depende de dados
  que podem ou não estar presentes.
- Dificulta **deep linking** — a URL não carrega informação suficiente para reconstruir
  a página sem o estado anterior.
- Torna o comportamento da aplicação **não determinístico** dependendo de como o usuário
  chegou à página.

## Regra

Passe apenas um **`id`** (como parâmetro de rota ou query param). A página de destino
usa esse `id` para buscar os dados via API ou ler do cache do TanStack Query.

## ❌ Errado — passando objeto via `state`

Padrão encontrado no codebase que **não deve ser replicado**:

```tsx
// onSuccess de uma mutation — passa objetos de negócio no state
mutate(payload, {
  onSuccess: (response) => {
    navigate(ROUTES.SINISTRO_CONFIRMAR, {
      state: { protocolo: response, formData: values }, // ← PROIBIDO
      replace: false,
    });
  },
});

// Página de destino — depende do state para funcionar
const location = useLocation();
const { protocolo, formData } = location.state ?? {}; // ← quebra no reload ou deep link
```

**Problemas:**

- Recarregar `/sinistros/confirmar` diretamente → `protocolo` e `formData` são `undefined`
- Compartilhar o link → página quebrada
- Navegar via histórico do browser → comportamento imprevisível

## ✅ Correto — passando apenas o `id` como param de rota

```tsx
// Página de origem — passa apenas o id na URL
navigate(ROUTES.SINISTRO_DETAIL(sinistro.id));

// Página de destino — usa o id para buscar/ler os dados
const { id } = useParams<{ id: string }>();
const { sinistro, isLoading } = useFetchSinistroById(id); // busca via API ou cache
```

## ✅ Correto — passando filtros como query params

```tsx
// Página de origem — filtros na URL
navigate(`${ROUTES.SINISTROS}?status=aberto&page=2`);
// ou com ROUTES + URLSearchParams
const params = new URLSearchParams({ status: 'aberto', page: '2' });
navigate(`${ROUTES.SINISTROS}?${params}`);

// Página de destino — lê os query params
const [status] = useQueryState('status', parseAsString.withDefault(''));
const [page] = useQueryState('page', parseAsInteger.withDefault(1));
```

## ✅ Correto — fluxo multi-step com Context (Feature Layout)

Quando páginas de um fluxo precisam compartilhar estado temporário (ex: wizard de
aviso de sinistro), use um **Feature Layout** com Provider escopado ao fluxo.
Nunca passe o estado acumulado via `location.state` de uma etapa para a próxima.

```tsx
// AvisoContext — estado compartilhado entre as 3 etapas do fluxo
const { chave, setChave, dados, setDados } = useAviso();

// Etapa 1 — salva no contexto, navega para etapa 2
setChave(formData);
navigate(ROUTES.SINISTRO_AVISO_DADOS);

// Etapa 2 — lê do contexto (não de location.state)
const { chave } = useAviso();
```

Ver [`router-feature-layout.md`](./router-feature-layout.md) para o padrão completo.

## Quando `location.state` é aceitável

O único uso legítimo de `location.state` neste projeto é o redirect pós-login:

```tsx
// ProtectedRoute — preserva a URL tentada
<Navigate to={ROUTE_PATTERNS.LOGIN} state={{ from: location }} replace />;

// LoginPage — redireciona de volta após autenticação
const from = (location.state as { from?: Location })?.from?.pathname ?? ROUTES.HOME;
navigate(from, { replace: true });
```

Mesmo aqui, apenas a **URL** (`pathname`) é preservada — nunca dados de negócio.

## Resumo

| Cenário                                  | Solução correta                                    |
| ---------------------------------------- | -------------------------------------------------- |
| Navegar para detalhe de um item          | `:id` como parâmetro de rota + fetch na página     |
| Filtros e paginação entre páginas        | Query params via Nuqs (`useQueryState`)            |
| Estado compartilhado em fluxo multi-step | Feature Layout + Context Provider escopado         |
| Redirect pós-login preservando URL       | `state={{ from: location }}` — único uso permitido |
| Qualquer objeto de negócio entre rotas   | ❌ Nunca via `location.state`                      |

## Referência no codebase

- [`src/router/ProtectedRoute.tsx`](../../../src/router/ProtectedRoute.tsx) — único uso legítimo de `state`
- [`src/context/AvisoContext.tsx`](../../../src/context/AvisoContext.tsx) — Context para fluxo multi-step
- [`src/router/AppRouter.tsx`](../../../src/router/AppRouter.tsx) — `AvisoLayout` como Feature Layout
