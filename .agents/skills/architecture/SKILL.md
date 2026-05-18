---
name: architecture
description: >
  Guia arquitetural de um painel React 19 com TypeScript,
  TanStack Query, Zustand, React Hook Form, Zod, Nuqs e Tailwind CSS.
  Use SEMPRE que o usuário pedir para criar um novo módulo, componente, hook, schema,
  tipo ou utilitário; refatorar ou entender a estrutura de qualquer arquivo existente;
  adicionar uma nova feature ao projeto; ou tiver dúvidas sobre onde colocar um arquivo
  ou como seguir o padrão do projeto. Esta skill define o padrão definitivo do codebase.
---

# Arquitetura

## Categorias de Regras

| Prioridade | Categoria             | Regras   | Impacto                         |
| ---------- | --------------------- | -------- | ------------------------------- |
| CRITICAL   | Estrutura Global      | 2 regras | Fundação de todo o projeto      |
| CRITICAL   | Módulos de Domínio    | 1 regra  | Consistência entre features     |
| CRITICAL   | Camada `types/`       | 1 regra  | Type safety e query keys        |
| CRITICAL   | Camada `hooks/`       | 1 regra  | Padrão de data fetching e cache |
| HIGH       | Camada `components/`  | 1 regra  | Separação JSX / lógica          |
| HIGH       | Camada `utils/`       | 1 regra  | Funções puras de módulo         |
| HIGH       | Query Params (Nuqs)   | 1 regra  | Estado de URL                   |
| HIGH       | HTTP (Axios)          | 1 regra  | Autenticação automática         |
| MEDIUM     | Aliases de Importação | 1 regra  | Legibilidade e refatoração      |
| MEDIUM     | Camada `pages/`       | 1 regra  | Páginas finas                   |
| MEDIUM     | Providers Globais     | 1 regra  | Ordem de wrap                   |
| HIGH       | Utilitários Globais   | 5 regras | Consistência em todo o projeto  |

## Quick Reference

### Estrutura e Módulos (CRITICAL)

- `arch-global-structure` — Mapa completo de `src/` e onde criar cada tipo de arquivo
- `arch-module-structure` — Estrutura interna de um módulo (`components/`, `hooks/`, `schema/`, `types/`, `utils/`)
- `arch-no-barrel-index` — **Nunca** crie `index.ts` / `index.tsx` apenas para re-exportar; importe sempre do arquivo de origem
- `arch-types-layer` — Interface com prefixo `I`, enums de status, enum de QueryKeys
- `arch-hooks-layer` — 5 tipos de hook: lista paginada, item por ID, leitura de cache, mutation, update cache

### Componentes e Camadas (HIGH)

- `arch-components-layer` — `memo` + `forwardRef` + `displayName`, hook local, Zustand para estado compartilhado
- `arch-utils-layer` — `handleParams`, `forceRefetchCached`, `updateInCache` — quando usar cada um
- `arch-url-params` — Filtros, paginação e modais via Nuqs + normalização com `useMemo`
- `arch-http-axios` — Sempre `useBaseApi()`, nunca instância direta do Axios

### Utilitários Globais (HIGH) — `src/utils/`

- `util-datetime` — **Toda** manipulação de data via `DateTime` de `@/utils/dateTime`; nunca importe `date-fns` diretamente
- `util-istype` — Verificação de tipos via `isString`, `isNumber`, `isFile`, `isNumberable` etc. de `@/utils/isType`
- `util-regex` — **Toda** RegExp via `regex` de `@/utils/regex`; nunca crie `/pattern/` inline
- `util-constants` — Mensagens de erro via `CONSTANTS.ERROR_MESSAGES`; chaves de storage via `CONSTANTS.STORAGE_KEYS`
- `util-array` — Ordenação de arrays de objetos via `sortObjectsByProperty` de `@/utils/array`

### Convenções Gerais (MEDIUM)

- `arch-imports-alias` — Sempre `@/` para importações absolutas; relativo apenas dentro da mesma pasta
- `arch-pages-layer` — Páginas finas: só composição, sem lógica; nomenclatura `Create/Edit/View/List`
- `arch-providers` — Ordem de wrap: NuqsAdapter > QueryClientProvider > AlertContextProvider

## Como Usar

Leia os arquivos de regra individuais para explicações detalhadas e exemplos:

```
rules/arch-global-structure.md
rules/arch-module-structure.md
rules/arch-no-barrel-index.md
rules/arch-hooks-layer.md
```

---

## Stack Tecnológica

| Camada            | Biblioteca            |
| ----------------- | --------------------- |
| UI                | React 19 + TypeScript |
| Bundler           | Vite (rolldown-vite)  |
| Estilo            | Tailwind CSS v4       |
| Roteamento        | React Router DOM v7   |
| Estado servidor   | TanStack Query v5     |
| Estado cliente/UI | Zustand v5            |
| Formulários       | React Hook Form v7    |
| Validação         | Zod v3                |
| Query params URL  | Nuqs v2               |
| HTTP              | Axios                 |
| Notificações      | react-toastify        |
| Datas             | date-fns              |

---

## Estrutura global de `src/`

```
src/
├── App.tsx                 # Raiz da aplicação
├── main.tsx                # Entry point (monta Providers + App)
├── routes                  # Declaração de todas as rotas
├── @types/                 # Declarações globais de tipos TypeScript
├── components/             # Componentes compartilhados (UI, icons, helpers)
│   ├── icons/              # Ícones SVG como componentes React
│   ├── ui/                 # Componentes de design system (buttons, forms, overlay, etc.)
│   └── helpers/            # Utilitários de CSS (módulos de animação)
├── hooks/
│   ├── useBaseApi.ts       # Hooks utilitários (useBaseApi, useAlertModal, etc.)
│   └── ...
├── style/
│   ├── index.css           # Estilos globais Tailwind
│   ├── utils.css           # Classes utilitárias personalizadas (ex: text-ellipsis)
│   └── ...
├── domains/                # Módulos de domínio (ver seção abaixo)
├── pages/                  # Páginas que montam domains e definem rotas
├── providers/              # Provedores globais (QueryClient, Alert, NuqsAdapter)
├── types/                  # Tipos globais compartilhados entre módulos
├── tests/                  # Tipos usados apenas em testes (ex: MockedApiResponse)
└── utils/                  # Funções utilitárias puras + helpers globais
    ├── tanstakQueryHelpers/ # Helpers de cache (setItemInCache, getItemFromQueryCache, queryClient, etc.)
    ├── constants.ts         # Constantes globais (ERROR_MESSAGES, STORAGE_KEYS, etc.)
    ├── regex.ts             # Expressões regulares reutilizáveis
    ├── date.ts / dateTime.ts # Formatações e conversões de data
    ├── isType.ts            # Type guards (isString, isNumber, isFile, etc.)
    ├── removeEmptyKeys.ts   # Remove chaves com valor vazio/nulo de objetos
    ├── file.ts              # Utilitários de arquivo (validação de tamanho, tipo, etc.)
    ├── toBase64.ts          # Converte arquivo para base64
    ├── hookFormHelpers.ts   # Helpers para React Hook Form (ex: getOnlyDirtyFields)
    ├── zodHelpers.ts        # Helpers de validação Zod
    └── ...                  # Outros utilitários puros
```

---

## Módulos de Domínio (`src/domains/`)

Cada módulo agrupa toda a lógica de uma feature de negócio. O módulo `coupon` é o
**modelo de referência** que todos os outros devem seguir.

### Estrutura padrão de um módulo

```
domains/<nome-do-modulo>/
├── components/             # Componentes específicos do módulo
│   └── <NomeComponente>/
│       ├── index.tsx                 # Componente React (memo + forwardRef quando necessário)
│       └── use<NomeComponente>.ts    # Hook local do componente (lógica extraída do JSX)
│       └── ...                       # Pode ter sub-componentes dentro da mesma pasta
│   └── ...                           # Outros componentes do módulo
├── pages/                            # Páginas específicas do módulo (opcional, só se necessário)
├── hooks/                            # Hooks de dados do módulo
│   ├── useFetchCoupons.ts            # Exemplo: busca lista paginada
│   ├── useGetCouponFromCache.ts      # Exemplo: lê item direto do cache (staleTime: Infinity)
│   └── ...                           # Outros hooks de fetch, mutação, cache etc.
├── schema/                 # Schemas Zod + tipos inferidos + instância do useForm
│   └── <entidade>FormSchema.ts
│   └── ...                           # Outros schemas (ex: schema de filtro)
├── types/                  # Tipos e enums de domínio
│   ├── <Entidade>.ts                 # Interface principal + enums de status/tipo
│   └── <Entidade>QueryKeys.ts        # Enum com as query keys do TanStack Query
└── utils/                  # Funções puras específicas do módulo
    ├── handle<Entidade>Params.ts     # Sanitiza/normaliza parâmetros de query
    └── ...                           # Outros utilitários (ex: forceRefetchCached*)
```

> Módulos que não possuem schema, types ou utils próprios **não criam as pastas**.
> Só adicione uma pasta se ela for necessária.

---

## Padrões por camada

### `types/<Entidade>.ts`

- Defina **enums** para status, tipos e categories da entidade.
- Use o prefixo `I` para interfaces: `ICoupon`, `IBanner`.
- Exporte tipos auxiliares que derivam da entidade principal.

```ts
// Exemplo
export enum CoupomStatus {
  Todos = 'Todos',
  Ativo = 'Ativo',
  Inativo = 'Inativo',
}

export interface ICoupon {
  id: string;
  status: CoupomStatus;
  // ...
}
```

### `types/<Entidade>QueryKeys.ts`

- **Sempre** use um enum dedicado para query keys. Nunca use strings avulsas.
- Separe por contexto se o módulo tiver múltiplas entidades (ex: `coupon` tem
  `CoupomQueryKeys` e `CheckinQueryKeys` no mesmo arquivo).

```ts
export enum CoupomQueryKeys {
  Coupons = 'coupons',
  Coupon = 'coupon',
}
```

### `hooks/` — convenções gerais

- Hooks de **lista paginada** (`useFetch<Entidade>s`): recebem params tipados, normalizam com `useMemo`, populam o cache individual via `setItemInCache` ao iterar sobre `response.data`, retornam valores renomeados descritivamente (`data` → `<entidade>Records`).
- Hooks de **item único** (`useFetch<Entidade>ById`): aplicam cache-first via `getItemFromQueryCache` antes de buscar HTTP; usam `gcTime: Infinity` e `staleTime: Infinity`; `enabled: !!id`.
- Hooks de **leitura de cache** (`useGet<Entidade>FromCache`): usam `useQuery` com `queryFn: () => null` e `staleTime/gcTime: Infinity`; servem para componentes que só leem dados já cacheados.
- Hooks de **mutação** (`useMutate<Entidade>`): agrupam `createEntity` e `updateEntity` no mesmo arquivo; expõem `isSubmiting<Entidade>` via `useMemo`; usam `retry: 0`.
- Funções de **atualização de cache** (`update<Entidade>InCache`): são funções puras (não hooks) que chamam `setItemInCache` com updater function para atualização otimista.

### `schema/<entidade>FormSchema.ts`

- Exporte: o schema (`z.object`), o tipo inferido (`z.infer<typeof schema>`) e o hook `use<Entidade>FormSchema` que retorna a instância do `useForm` com `zodResolver`.
- Constantes de erro vêm de `CONSTANTS.ERROR_MESSAGES`.

### `utils/` — convenções gerais

- `handle<Entidade>Params.ts`: função pura que normaliza os params brutos; use `removeEmptyKeys` para limpar campos vazios e faça os casts necessários.
- `forceRefetchCached<Entidade>.ts`: chama `queryClient.invalidateQueries` com `exact: false` para invalidar toda a lista da entidade.

### `components/<NomeComponente>/index.tsx`

- Componentes de tabela/lista usam `memo` + `forwardRef`.
- Componentes que apenas leem do cache usam `useGet<Entidade>FromCache` (nunca buscam HTTP).
- Props são tipadas em uma `interface` local com sufixo `Props`.
- Adicione `ComponentName.displayName` quando usar `memo` + `forwardRef`.

### `components/<NomeComponente>/use<NomeComponente>.ts` — hook local de componente

- Extraia lógica pesada do JSX para um hook local dentro da pasta do componente.
- Quando o estado do componente precisar ser compartilhado entre dois componentes no
  mesmo módulo (ex: modal controlado por botão externo), use **Zustand** via `create()`,
  com `useShallow` para selecionar state e actions separadamente.

```ts
// Padrão Zustand para estado de modal local
const useShowModalStore = create<State & Action>((set) => ({
  show: false,
  setShow: (value) => set(() => ({ show: value })),
}));

export const useMyModal = () => {
  const { show } = useShowModalStore(useShallow((s) => ({ show: s.show })));
  const { setShow } = useShowModalStore(useShallow((s) => ({ setShow: s.setShow })));
  return { show, setShow };
};
```

---

## Query params de URL

Use **Nuqs** para sincronizar filtros, paginação e flags de modal com a URL:

```ts
const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
const [status, setStatus] = useQueryState('status', parseAsString.withDefault('Todos'));
const [showModal, setShowModal] = useQueryState('showModal', {
  defaultValue: false,
  parse: (v) => v === 'true',
});
```

---

## Comunicação HTTP

- Sempre use o hook `useBaseApi()` (de `@/hooks/useBaseApi`) para obter a instância
  `apiBase` do axios. Nunca instancie axios diretamente nos módulos.
- O `apiBase` já injeta o Bearer token automáticamente.

---

## Aliases de importação

Use sempre o alias `@/` para importações absolutas:

```ts
import { useBaseApi } from '@/hooks/useBaseApi';
import { ICoupon } from '@/domains/coupon/types/Coupon';
import { setItemInCache } from '@/utils/tanstakQueryHelpers/setItemInCache';
```

---

## Páginas (`src/pages/`)

- Páginas são finas: apenas compõem componentes do módulo e passam props.
- A lógica de negócios fica nos hooks do módulo, nunca nas páginas.
- Páginas de CRUD seguem o padrão: `Create<Entidade>Page`, `Edit<Entidade>Page`,
  `View<Entidade>Page`, `<Entidades>Page` (lista).

---

## Providers globais (`src/providers/`)

Ordem de wrap (de fora para dentro):

1. `NuqsAdapter` (react-router/v7)
2. `QueryClientProvider`
3. `AlertContextProvider`
