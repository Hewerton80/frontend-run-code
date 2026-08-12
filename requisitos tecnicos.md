# 🚀 STARTKIT — Guia Técnico Completo do Projeto

> Documento de referência para replicar a arquitetura, padrões e stack tecnológica deste projeto em novos projetos. Use como checklist de bootstrap e guia de boas práticas.

---

## Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Stack Tecnológica Completa](#2-stack-tecnológica-completa)
3. [Dependências Completas](#3-dependências-completas)
4. [Estrutura de Pastas](#4-estrutura-de-pastas)
5. [Padrões de Código e Arquitetura](#5-padrões-de-código-e-arquitetura)
6. [Exemplos de Código Reais](#6-exemplos-de-código-reais)
7. [Configurações de Ferramentas](#7-configurações-de-ferramentas)
8. [Padrões de Git e Commits](#8-padrões-de-git-e-commits)
9. [Scripts Disponíveis](#9-scripts-disponíveis)
10. [Checklist de Novo Projeto](#10-checklist-de-novo-projeto)
11. [Boas Práticas e Regras do Projeto](#11-boas-práticas-e-regras-do-projeto)

---

## 1. Visão Geral do Projeto

### Filosofia

Este projeto é um **SPA (Single Page Application)** construído com React 19 e TypeScript, seguindo uma arquitetura **feature-based (modular por domínio)**. Cada funcionalidade de negócio vive em um módulo isolado dentro de `src/modules/`, contendo seus próprios componentes, hooks, schemas, tipos e utilitários.

### Princípios Fundamentais

- **Separação de responsabilidades**: JSX nos componentes, lógica nos hooks locais, estado de servidor no TanStack Query, estado de UI no Zustand.
- **Cache-first**: Dados buscados uma vez são armazenados no cache do TanStack Query e reutilizados por toda a aplicação sem novas requisições HTTP.
- **URL como estado**: Filtros, paginação e flags de modal são sincronizados com a URL via Nuqs, permitindo deep linking e compartilhamento de estado.
- **Type safety total**: TypeScript estrito em todo o codebase, com interfaces prefixadas com `I`, enums para query keys e tipos inferidos de schemas Zod.
- **Zero barrel files**: Nunca criar `index.ts` apenas para re-exportar. Importar sempre do arquivo de origem.

---

## 2. Stack Tecnológica Completa

| Camada                | Tecnologia              | Versão   | Justificativa                                   |
| --------------------- | ----------------------- | -------- | ----------------------------------------------- |
| **Runtime**           | Node.js                 | ≥ 20 LTS | Compatibilidade com Vite 6 e ESM nativo         |
| **Package Manager**   | Yarn                    | 1.x      | Lockfile determinístico                         |
| **Bundler**           | Vite                    | ^6.2     | HMR instantâneo, build otimizado com rolldown   |
| **Framework UI**      | React                   | ^19.2    | Concurrent features, React Compiler             |
| **Linguagem**         | TypeScript              | ~5.9     | Type safety, autocomplete, refatoração segura   |
| **Estilização**       | Tailwind CSS            | ^4.3     | Utility-first, design tokens via CSS variables  |
| **Design System**     | shadcn/ui + Radix UI    | latest   | Componentes acessíveis, sem opinião de estilo   |
| **Roteamento**        | React Router DOM        | ^7.15    | Lazy loading nativo, layouts aninhados          |
| **Estado Servidor**   | TanStack Query          | ^5.100   | Cache inteligente, invalidação granular         |
| **Estado UI/Cliente** | Zustand                 | ^5.0     | Stores simples, sem boilerplate                 |
| **Formulários**       | React Hook Form         | ^7.76    | Performance (uncontrolled), integração com Zod  |
| **Validação**         | Zod                     | ^4.4     | Schema-first, tipos inferidos automaticamente   |
| **Query Params URL**  | Nuqs                    | ^2.8     | Sincronização de estado com URL                 |
| **HTTP Client**       | Axios                   | ^1.16    | Interceptors, cancelamento, tipagem             |
| **Notificações**      | react-toastify          | ^11.1    | Toast system desacoplado                        |
| **Datas**             | date-fns                | ^4.2     | Tree-shakeable, imutável                        |
| **Ícones**            | lucide-react            | ^1.17    | SVG consistente, tree-shakeable                 |
| **Realtime**          | Ably                    | ^2.21    | WebSocket gerenciado para eventos em tempo real |
| **Editor de Código**  | react-ace + ace-builds  | ^14      | Editor de código embutido                       |
| **Rich Text**         | TipTap                  | ^3.26    | Editor WYSIWYG extensível                       |
| **Gráficos**          | Recharts                | ^3.8     | Gráficos React-native, responsivos              |
| **Virtualização**     | @tanstack/react-virtual | ^3.14    | Listas longas sem degradação de performance     |
| **Linting**           | ESLint                  | ^9.39    | Flat config, TypeScript-aware                   |

---

## 3. Dependências Completas

### Dependencies (Produção)

#### 🎨 UI & Design System

| Pacote                       | Versão  | Função                                |
| ---------------------------- | ------- | ------------------------------------- |
| `react`                      | ^19.2.6 | Framework principal                   |
| `react-dom`                  | ^19.2.6 | Renderização DOM                      |
| `tailwindcss`                | ^4.3.0  | Utility-first CSS framework           |
| `@tailwindcss/vite`          | ^4.3.0  | Plugin Vite para Tailwind v4          |
| `tw-animate-css`             | ^1.4.0  | Animações CSS para Tailwind           |
| `tailwindcss-animate`        | ^1.0.7  | Plugin de animações Tailwind          |
| `class-variance-authority`   | ^0.7.1  | Variantes de componentes (CVA)        |
| `clsx`                       | ^2.1.1  | Concatenação condicional de classes   |
| `tailwind-merge`             | ^3.6.0  | Merge inteligente de classes Tailwind |
| `lucide-react`               | ^1.17.0 | Biblioteca de ícones SVG              |
| `react-icons`                | ^5.6.0  | Ícones adicionais (FontAwesome, etc.) |
| `@fontsource-variable/geist` | ^5.2.9  | Fonte Geist variable                  |

#### 🧩 Radix UI Primitives

| Pacote                          | Versão  | Função                                |
| ------------------------------- | ------- | ------------------------------------- |
| `@radix-ui/react-accordion`     | ^1.2.12 | Accordion acessível                   |
| `@radix-ui/react-avatar`        | ^1.1.11 | Avatar com fallback                   |
| `@radix-ui/react-checkbox`      | ^1.3.3  | Checkbox acessível                    |
| `@radix-ui/react-dialog`        | ^1.1.15 | Modal/Dialog acessível                |
| `@radix-ui/react-dropdown-menu` | ^2.1.16 | Menu dropdown acessível               |
| `@radix-ui/react-menubar`       | ^1.1.16 | Barra de menu acessível               |
| `@radix-ui/react-popover`       | ^1.1.15 | Popover acessível                     |
| `@radix-ui/react-progress`      | ^1.1.8  | Barra de progresso                    |
| `@radix-ui/react-radio-group`   | ^1.3.8  | Radio group acessível                 |
| `@radix-ui/react-scroll-area`   | ^1.2.10 | Scroll area customizável              |
| `@radix-ui/react-select`        | ^2.2.6  | Select acessível                      |
| `@radix-ui/react-slot`          | ^1.2.4  | Slot pattern (asChild)                |
| `@radix-ui/react-switch`        | ^1.2.6  | Toggle switch acessível               |
| `@radix-ui/react-tabs`          | ^1.1.13 | Tabs acessíveis                       |
| `@radix-ui/react-tooltip`       | ^1.2.8  | Tooltip acessível                     |
| `@base-ui/react`                | ^1.5.0  | Primitivos Base UI                    |
| `radix-ui`                      | ^1.5.0  | Meta-pacote Radix                     |
| `shadcn`                        | ^4.11.0 | CLI para adicionar componentes shadcn |

#### 📡 Estado & Dados

| Pacote                    | Versão    | Função                                   |
| ------------------------- | --------- | ---------------------------------------- |
| `@tanstack/react-query`   | ^5.100.10 | Cache e sincronização de estado servidor |
| `@tanstack/react-virtual` | ^3.14.5   | Virtualização de listas longas           |
| `zustand`                 | ^5.0.13   | Estado global de UI (client state)       |
| `nuqs`                    | ^2.8.9    | Query params de URL como estado React    |
| `axios`                   | ^1.16.1   | HTTP client com interceptors             |
| `ably`                    | ^2.21.0   | WebSocket/Realtime (pub/sub)             |

#### 📝 Formulários & Validação

| Pacote                | Versão  | Função                                      |
| --------------------- | ------- | ------------------------------------------- |
| `react-hook-form`     | ^7.76.0 | Formulários performáticos (uncontrolled)    |
| `@hookform/resolvers` | ^5.2.2  | Integração RHF com Zod                      |
| `zod`                 | ^4.4.3  | Schema de validação com inferência de tipos |

#### 🗓️ Utilitários

| Pacote                   | Versão  | Função                                |
| ------------------------ | ------- | ------------------------------------- |
| `date-fns`               | ^4.2.1  | Manipulação de datas (tree-shakeable) |
| `use-debounce`           | ^10.1.1 | Debounce para inputs de busca         |
| `react-toastify`         | ^11.1.0 | Sistema de notificações toast         |
| `react-day-picker`       | ^10.0.1 | Seletor de datas                      |
| `react-select`           | ^5.10.2 | Select avançado com busca             |
| `react-resizable-panels` | ^4.1.1  | Painéis redimensionáveis              |

#### ✏️ Editores

| Pacote                | Versão  | Função                               |
| --------------------- | ------- | ------------------------------------ |
| `ace-builds`          | ^1.44.0 | Editor de código Ace                 |
| `react-ace`           | ^14.0.1 | Wrapper React para Ace Editor        |
| `@tiptap/react`       | ^3.26.1 | Editor rich text                     |
| `@tiptap/starter-kit` | ^3.26.1 | Extensões básicas TipTap             |
| `@tiptap/extension-*` | ^3.26.1 | Extensões adicionais TipTap          |
| `katex`               | ^0.17.0 | Renderização de fórmulas matemáticas |
| `pyodide`             | ^0.29.4 | Python no browser (WebAssembly)      |

#### 📊 Visualização

| Pacote     | Versão | Função                         |
| ---------- | ------ | ------------------------------ |
| `recharts` | ^3.8.1 | Gráficos baseados em React/SVG |

### DevDependencies

| Pacote                        | Versão          | Função                                 |
| ----------------------------- | --------------- | -------------------------------------- |
| `vite`                        | ^6.2.0          | Bundler e dev server                   |
| `@vitejs/plugin-react`        | ^4.3.4 / ^5.1.1 | Plugin React para Vite                 |
| `typescript`                  | ~5.9.3          | Compilador TypeScript                  |
| `eslint`                      | ^9.39.1         | Linter                                 |
| `@eslint/js`                  | ^9.39.1         | Regras ESLint para JS                  |
| `typescript-eslint`           | ^8.46.4         | Regras ESLint para TypeScript          |
| `eslint-plugin-react-hooks`   | ^7.0.1          | Regras para React Hooks                |
| `eslint-plugin-react-refresh` | ^0.4.24         | Regras para React Refresh              |
| `globals`                     | ^16.5.0         | Variáveis globais para ESLint          |
| `babel-plugin-react-compiler` | ^1.0.0          | React Compiler (otimização automática) |
| `vite-tsconfig-paths`         | ^5.1.4          | Suporte a path aliases no Vite         |
| `vite-plugin-svgr`            | ^4.5.0          | Importar SVGs como componentes React   |
| `@types/node`                 | 22.12.0         | Tipos Node.js                          |
| `@types/react`                | 19.0.0          | Tipos React                            |
| `@types/react-dom`            | 19.0.0          | Tipos React DOM                        |

---

## 4. Estrutura de Pastas

```
src/
├── App.tsx                          # Raiz da aplicação (monta AppRouter)
├── main.tsx                         # Entry point (ReactDOM.createRoot)
├── providers.tsx                    # Providers globais (QueryClient, Nuqs, Ably, Toast)
│
├── routes/                          # Configuração de roteamento
│   ├── AppRouter.tsx                # createBrowserRouter + lazy loading de todas as páginas
│   ├── routes.ts                    # ROUTE_PATTERNS (declaração) e ROUTES (navegação)
│   ├── ProtectedRoute.tsx           # Guard de autenticação e autorização por role
│   └── index.tsx                    # Re-export do AppRouter
│
├── pages/                           # Páginas finas — só composição, sem lógica
│   ├── AuthLoginPage.tsx
│   ├── HomePage.tsx
│   ├── ExercisesPage.tsx            # Padrão: <Entidades>Page (lista)
│   ├── ExercisePage.tsx             # Padrão: <Entidade>Page (detalhe)
│   ├── CreateExercisePage.tsx       # Padrão: Create<Entidade>Page
│   ├── EditExercisePage.tsx         # Padrão: Edit<Entidade>Page
│   └── ...
│
├── components/                      # Componentes compartilhados
│   ├── ui/                          # Design system (shadcn/ui + customizações)
│   │   ├── feedback/                # Spinner, Toast, NotFound404, etc.
│   │   ├── forms/                   # Input, Select, Checkbox, etc.
│   │   └── ...
│   ├── layouts/                     # Layouts de página (InLayout, AuthLayout, etc.)
│   ├── icons/                       # SVGs como componentes React
│   └── common/                      # Componentes compartilhados entre módulos
│
├── modules/                         # Módulos de domínio (feature-based)
│   ├── user/
│   │   ├── components/              # Componentes específicos do módulo
│   │   │   └── ListUsers/
│   │   │       ├── index.tsx        # Componente (memo + forwardRef)
│   │   │       └── UserTableRow.tsx # Sub-componente
│   │   ├── hooks/                   # Hooks de dados
│   │   │   ├── useFetchUsers.ts     # Lista paginada
│   │   │   ├── useFetchTeachers.ts  # Lista com filtro
│   │   │   └── useGetCachedUserRow.ts # Leitura de cache
│   │   ├── types/                   # Tipos e enums de domínio
│   │   │   ├── UserQueryKeys.ts     # Enum de query keys
│   │   │   └── (User.ts)            # Interface IUser + enums de status
│   │   ├── utils/                   # Funções puras do módulo
│   │   │   └── userQueryKeyFactory.ts # Factory de query keys
│   │   └── userTypets.ts            # (legado) Tipos do módulo user
│   │
│   ├── exercise/                    # Módulo de exercícios
│   ├── submission/                  # Módulo de submissões de código
│   ├── classroom/                   # Módulo de salas de aula
│   ├── list/                        # Módulo de listas de exercícios
│   ├── language/                    # Módulo de linguagens de programação
│   └── insights/                    # Módulo de gráficos e analytics
│
├── hooks/                           # Hooks globais reutilizáveis
│   ├── useAxios.ts                  # Instância Axios com Bearer token automático
│   ├── usePagination.ts             # Lógica de paginação
│   ├── useQueryParams.ts            # Leitura de query params da URL
│   ├── useSessionStorage.ts         # Wrapper para sessionStorage
│   ├── useTheme.ts                  # Toggle dark/light mode
│   ├── useToast.ts                  # Wrapper para react-toastify
│   ├── useProgressBar.ts            # Controle da barra de progresso global
│   ├── useSideBar.ts                # Estado do sidebar
│   ├── useTypeWriterText.ts         # Efeito typewriter
│   └── useClearGlobalStates.ts      # Limpa todos os estados globais (logout)
│
├── stores/                          # Stores Zustand globais
│   └── useProgressBarStore.ts       # Estado da barra de progresso
│
├── style/                           # Estilos globais
│   ├── index.css                    # Tailwind + CSS variables (design tokens)
│   └── utils/
│       └── tiptap.css               # Estilos do editor TipTap
│
├── types/                           # Tipos globais compartilhados
│   ├── index.d.ts                   # Declarações de módulos (SVG, etc.)
│   ├── paginated.ts                 # IPaginatedDocs<T>, IPaginationParams
│   └── updater.ts                   # Tipos para funções de atualização de cache
│
└── utils/                           # Funções utilitárias puras
    ├── tanstackQueryHelpers/        # Helpers de cache TanStack Query
    │   ├── queryClient.ts           # Instância singleton do QueryClient
    │   ├── addItemInQueryCache.ts   # Adiciona item no cache (lista/infinite)
    │   ├── deleteItemInQueryCache.ts # Remove item do cache
    │   ├── findItemInQueryCache.ts  # Busca item no cache por predicado
    │   ├── getItemFromQueryCache.ts # Lê item do cache por query key
    │   ├── getItemsFromQueryCache.ts # Lê lista do cache
    │   ├── getStateItemFromQueryCache.ts # Lê estado de um item
    │   ├── hasQueryCache.ts         # Verifica se cache existe
    │   └── invalidateQueriesInCache.ts # Invalida queries por prefixo
    ├── axiosConfig.ts               # Configuração base do Axios
    ├── cn.ts                        # Utilitário clsx + tailwind-merge
    ├── constants.ts                 # CONSTANTS (mensagens de erro, chaves de storage)
    ├── dateTime.ts                  # Formatações e conversões de data (date-fns)
    ├── envConfig.ts                 # Variáveis de ambiente tipadas
    ├── hookFormHelpers.ts           # Helpers para React Hook Form
    ├── isType.ts                    # Type guards (isString, isNumber, etc.)
    ├── queryParams.ts               # removeEmptyKeys e helpers de params
    ├── realtimeClient.ts            # Instância do cliente Ably
    ├── regex.ts                     # RegExps reutilizáveis
    ├── colorHelpers.ts              # Utilitários de cor
    ├── sleep.ts                     # Promise delay
    └── ...
```

### Estrutura Interna de um Módulo

```
modules/<nome-do-modulo>/
├── components/
│   └── <NomeComponente>/
│       ├── index.tsx                # Componente React (memo + forwardRef)
│       └── use<NomeComponente>.ts   # Hook local (lógica extraída do JSX)
├── hooks/
│   ├── useFetch<Entidade>s.ts       # Lista paginada
│   ├── useFetch<Entidade>ById.ts    # Item único (cache-first)
│   ├── useGetCached<Entidade>.ts    # Leitura de cache (staleTime: Infinity)
│   └── useMutate<Entidade>.ts       # Criação + atualização
├── schema/
│   └── <entidade>FormSchema.ts      # Schema Zod + tipo inferido + useForm hook
├── types/
│   ├── <Entidade>.ts                # Interface I<Entidade> + enums de status
│   └── <Entidade>QueryKeys.ts       # Enum de query keys
└── utils/
    ├── <entidade>QueryKeyFactory.ts # Factory de query keys
    ├── handle<Entidade>Params.ts    # Normaliza params de query
    ├── forceRefetch<Entidade>.ts    # Invalida cache da entidade
    └── updateCached<Entidade>.ts    # Atualização otimista de cache
```

---

## 5. Padrões de Código e Arquitetura

### 5.1 Estrutura de Componentes

#### Regras Fundamentais

- Componentes de lista/tabela usam `React.memo` + `React.forwardRef` + `displayName`
- Lógica pesada é extraída para um hook local `use<NomeComponente>.ts` na mesma pasta
- Props são tipadas em uma `interface` local com sufixo `Props`
- Nunca importar TanStack Query diretamente em componentes — use hooks customizados

```tsx
// ✅ Correto
interface UserTableRowProps {
  userId: string;
}

const UserTableRow = React.memo(
  React.forwardRef<HTMLTableRowElement, UserTableRowProps>(
    ({ userId }, ref) => {
      const { user } = useGetCachedUserRow(userId);
      return <tr ref={ref}>...</tr>;
    },
  ),
);
UserTableRow.displayName = "UserTableRow";
```

#### Padrão de Hook Local de Componente

```ts
// use<NomeComponente>.ts — extrai lógica do JSX
export const useMyComponent = () => {
  const { mutate } = useMutateEntity();
  const handleSubmit = useCallback(() => { ... }, []);
  return { handleSubmit };
};
```

#### Estado Compartilhado entre Componentes do Módulo

Quando dois componentes precisam compartilhar estado (ex: modal controlado por botão externo), use **Zustand** com `useShallow`:

```ts
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const useModalStore = create<{ show: boolean; setShow: (v: boolean) => void }>(
  (set) => ({
    show: false,
    setShow: (value) => set(() => ({ show: value })),
  }),
);

export const useMyModal = () => {
  const { show } = useModalStore(useShallow((s) => ({ show: s.show })));
  const { setShow } = useModalStore(
    useShallow((s) => ({ setShow: s.setShow })),
  );
  return { show, setShow };
};
```

### 5.2 Convenções de Nomenclatura

| Artefato              | Convenção                         | Exemplo                                |
| --------------------- | --------------------------------- | -------------------------------------- |
| Componente React      | PascalCase                        | `UserTableRow`, `CreateExercisePage`   |
| Hook customizado      | camelCase com prefixo `use`       | `useFetchUsers`, `useGetCachedUserRow` |
| Interface TypeScript  | PascalCase com prefixo `I`        | `IUser`, `ICoupon`, `IExercise`        |
| Enum                  | PascalCase                        | `UserQueryKeys`, `ExerciseStatus`      |
| Arquivo de componente | PascalCase                        | `UserTableRow.tsx`                     |
| Arquivo de hook       | camelCase                         | `useFetchUsers.ts`                     |
| Arquivo de tipo       | PascalCase                        | `UserQueryKeys.ts`                     |
| Arquivo de util       | camelCase                         | `userQueryKeyFactory.ts`               |
| Arquivo de schema     | camelCase com sufixo `FormSchema` | `exerciseFormSchema.ts`                |
| Constante global      | SCREAMING_SNAKE_CASE              | `ROUTE_PATTERNS`, `CONSTANTS`          |
| Página de lista       | `<Entidades>Page`                 | `ExercisesPage`                        |
| Página de detalhe     | `<Entidade>Page`                  | `ExercisePage`                         |
| Página de criação     | `Create<Entidade>Page`            | `CreateExercisePage`                   |
| Página de edição      | `Edit<Entidade>Page`              | `EditExercisePage`                     |

### 5.3 Padrão de Hooks de Dados (TanStack Query)

#### Hook de Lista Paginada

```ts
// useFetch<Entidade>s.ts
export const useFetchUsers = (params?: IFetchUsersParams) => {
  const { apiBase } = useAxios();

  const normalizedParams = useMemo(() => removeEmptyKeys(params), [params]);

  const {
    data: users,
    isFetching: isUsersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: userQueryKeyFactory.usersList(normalizedParams),
    queryFn: async ({ signal }) => {
      const res = await apiBase.get<IPaginatedDocs<IUser>>("/user", {
        params: normalizedParams,
        signal,
      });
      // Popula cache individual de cada item
      res.data?.data?.forEach((user) => {
        if (user.uuid)
          setItemInCache(userQueryKeyFactory.userRow(user.uuid), user);
      });
      return res.data ?? { data: [] };
    },
    enabled: true,
    retry: 0,
  });

  return { users, isUsersLoading, usersError, refetchUsers };
};
```

#### Hook de Leitura de Cache (sem HTTP)

```ts
// useGetCached<Entidade>.ts
export const useGetCachedUserRow = (userId?: string | null) => {
  const { data: user } = useQuery<IUser>({
    queryKey: userQueryKeyFactory.userRow(userId),
    queryFn: () => null as any,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!userId,
  });
  return { user };
};
```

### 5.4 Padrão de Query Key Factory

```ts
// <entidade>QueryKeyFactory.ts
import { UserQueryKeys } from "@/modules/user/types/UserQueryKeys";

export const userQueryKeyFactory = {
  users: () => [UserQueryKeys.Users] as const,
  usersList: (params?: object) =>
    [...userQueryKeyFactory.users(), params] as const,
  userRow: (userId?: string | null) => [UserQueryKeys.UserRow, userId] as const,
};
```

### 5.5 Padrão de Rotas

```ts
// routes.ts — dois objetos separados
export const ROUTE_PATTERNS = {
  // Padrões para declaração no router (com :params)
  USERS: "/users",
  USER_DETAIL: "/users/:userId",
} as const;

export const ROUTES = {
  // URLs absolutas para navegação
  USERS: ROUTE_PATTERNS.USERS,
  USER_DETAIL: (userId: string) => `/users/${userId}`,
};
```

### 5.6 Padrão de Providers

Ordem de wrap (de fora para dentro):

```tsx
// providers.tsx
export function Providers() {
  return (
    <AblyProvider client={realtimeClient}>
      {" "}
      {/* Realtime (se necessário) */}
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Estado servidor */}
        <NuqsAdapter>
          {" "}
          {/* Query params URL */}
          <Outlet />
          <ToastManager />
        </NuqsAdapter>
      </QueryClientProvider>
    </AblyProvider>
  );
}
```

### 5.7 Gerenciamento de Estado

| Tipo de Estado                     | Solução             | Quando Usar                              |
| ---------------------------------- | ------------------- | ---------------------------------------- |
| Estado de servidor (dados da API)  | TanStack Query      | Dados que vêm do backend                 |
| Estado de URL (filtros, paginação) | Nuqs                | Filtros, páginas, modais linkáveis       |
| Estado global de UI                | Zustand             | Sidebar, progress bar, tema              |
| Estado local de componente         | useState/useReducer | Estado que não precisa ser compartilhado |
| Estado de formulário               | React Hook Form     | Campos de formulário                     |

---

## 6. Exemplos de Código Reais

### 6.1 Componente Completo com Separação de Lógica

```tsx
// modules/user/components/ListUsers/index.tsx
import React from "react";
import { useListUsers } from "./useListUsers";
import { UserTableRow } from "./UserTableRow";

interface ListUsersProps {
  classroomId?: string;
}

export const ListUsers = React.memo(
  React.forwardRef<HTMLDivElement, ListUsersProps>(({ classroomId }, ref) => {
    const { users, isUsersLoading, columns } = useListUsers({ classroomId });

    if (isUsersLoading) return <div>Carregando...</div>;

    return (
      <div ref={ref} className="flex flex-col gap-2">
        {users?.data?.map((user) => (
          <UserTableRow key={user.uuid} userId={user.uuid} />
        ))}
      </div>
    );
  }),
);
ListUsers.displayName = "ListUsers";
```

```ts
// modules/user/components/ListUsers/useListUsers.ts
import { useFetchUsers } from "@/modules/user/hooks/useFetchUsers";

interface UseListUsersProps {
  classroomId?: string;
}

export const useListUsers = ({ classroomId }: UseListUsersProps) => {
  const { users, isUsersLoading } = useFetchUsers({ classroomId });

  return { users, isUsersLoading };
};
```

### 6.2 Hook de Dados com TanStack Query

```ts
// modules/exercise/hooks/useFetch
```

### 6.2 Hook de Dados com TanStack Query

```ts
// modules/exercise/hooks/useFetchExercises.ts
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IExercise } from "@/modules/exercise/types/Exercise";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginated";
import { removeEmptyKeys } from "@/utils/queryParams";

export interface IFetchExercisesParams extends IPaginationParams {
  keyword?: string;
  difficulty?: string;
}

export const useFetchExercises = (params?: IFetchExercisesParams) => {
  const { apiBase } = useAxios();

  const normalizedParams = useMemo(() => removeEmptyKeys(params), [params]);

  const {
    data: exercises,
    isFetching: isExercisesLoading,
    error: exercisesError,
    refetch: refetchExercises,
  } = useQuery({
    queryKey: exerciseQueryKeyFactory.exercisesList(normalizedParams),
    queryFn: async ({ signal }) => {
      const res = await apiBase.get<IPaginatedDocs<IExercise>>("/exercise", {
        params: normalizedParams,
        signal,
      });

      // Popula o cache individual de cada exercício
      res.data?.data?.forEach((exercise) => {
        if (exercise.uuid) {
          setItemInCache(
            exerciseQueryKeyFactory.exerciseRow(exercise.uuid),
            exercise,
          );
        }
      });

      return res.data ?? { data: [] };
    },
    enabled: true,
    retry: 0,
  });

  return { exercises, isExercisesLoading, exercisesError, refetchExercises };
};
```

### 6.3 Schema Zod + Formulário com React Hook Form

```ts
// modules/exercise/schema/exerciseFormSchema.ts
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONSTANTS } from "@/utils/constants";

const { REQUIRED_FIELD } = CONSTANTS.VALIDATION;

// 1. Schema Zod
export const exerciseFormSchema = z.object({
  title: z.string().min(1, REQUIRED_FIELD).max(200, "Máximo 200 caracteres"),
  description: z.string().min(1, REQUIRED_FIELD),
  difficulty: z.enum(["easy", "medium", "hard"], {
    error: "Selecione uma dificuldade válida",
  }),
  timeLimit: z
    .number()
    .min(1, "Mínimo 1 segundo")
    .max(30, "Máximo 30 segundos"),
  tags: z.array(z.string()).optional(),
});

// 2. Tipo inferido do schema
export type ExerciseFormData = z.infer<typeof exerciseFormSchema>;

// 3. Hook que retorna a instância do useForm
export const useExerciseFormSchema = (
  defaultValues?: Partial<ExerciseFormData>,
) => {
  return useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "easy",
      timeLimit: 5,
      tags: [],
      ...defaultValues,
    },
  });
};
```

```tsx
// Uso no componente de formulário
import { useExerciseFormSchema } from "@/modules/exercise/schema/exerciseFormSchema";
import { Controller } from "react-hook-form";

export const CreateExerciseForm = () => {
  const form = useExerciseFormSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit((data) => {
    // data é tipado como ExerciseFormData
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div>
            <input {...field} placeholder="Título do exercício" />
            {errors.title && <span>{errors.title.message}</span>}
          </div>
        )}
      />
    </form>
  );
};
```

### 6.4 Store Zustand

```ts
// stores/useProgressBarStore.ts
import { create } from "zustand";

type ProgressStateType = "initial" | "inProgress" | "completing" | "completed";

interface State {
  state: ProgressStateType;
  value: number;
}

interface Actions {
  setValue: (cb: (currentValue: number) => number) => void;
  setState: (state: ProgressStateType) => void;
}

export const useProgressBarStore = create<State & Actions>((set) => ({
  state: "initial",
  value: 0,
  setValue: (cb) => set((state) => ({ value: cb(state.value) })),
  setState: (state) => set(() => ({ state })),
}));

// Uso com useShallow para evitar re-renders desnecessários
import { useShallow } from "zustand/react/shallow";

export const useProgressBar = () => {
  const { value, state } = useProgressBarStore(
    useShallow((s) => ({ value: s.value, state: s.state })),
  );
  const { setValue, setState } = useProgressBarStore(
    useShallow((s) => ({ setValue: s.setValue, setState: s.setState })),
  );
  return { value, state, setValue, setState };
};
```

### 6.5 Interface TypeScript e Enum de Query Keys

```ts
// modules/exercise/types/ExerciseQueryKeys.ts
export enum ExerciseQueryKeys {
  Exercises = "exercises",
  ExerciseRow = "exerciseRow",
  ExerciseDetail = "exerciseDetail",
}
```

```ts
// modules/exercise/types/Exercise.ts
export enum ExerciseDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum ExerciseStatus {
  Active = "active",
  Inactive = "inactive",
  Draft = "draft",
}

export interface IExercise {
  uuid: string;
  title: string;
  description: string;
  difficulty: ExerciseDifficulty;
  status: ExerciseStatus;
  timeLimit: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Tipo auxiliar para criação (sem campos gerados pelo servidor)
export type ICreateExercise = Omit<
  IExercise,
  "uuid" | "createdAt" | "updatedAt"
>;
```

### 6.6 Query Key Factory

```ts
// modules/exercise/utils/exerciseQueryKeyFactory.ts
import { ExerciseQueryKeys } from "@/modules/exercise/types/ExerciseQueryKeys";

export const exerciseQueryKeyFactory = {
  /** Raiz de todas as queries de exercícios */
  exercises: () => [ExerciseQueryKeys.Exercises] as const,

  /** Lista paginada com params normalizados */
  exercisesList: (params?: object) =>
    [...exerciseQueryKeyFactory.exercises(), params] as const,

  /** Cache individual de uma linha de exercício (seed pela lista) */
  exerciseRow: (exerciseId?: string | null) =>
    [ExerciseQueryKeys.ExerciseRow, exerciseId] as const,

  /** Detalhe completo de um exercício */
  exerciseDetail: (exerciseId?: string | null) =>
    [ExerciseQueryKeys.ExerciseDetail, exerciseId] as const,
};
```

### 6.7 Utilitário HTTP (useAxios)

```ts
// hooks/useAxios.ts
import { envConfig } from "@/utils/envConfig";
import axios, { CreateAxiosDefaults } from "axios";
import { useSessionStorage } from "./useSessionStorage";

export const useAxios = () => {
  const [access_token] = useSessionStorage("access_token");

  const axiosConfig: CreateAxiosDefaults = {
    baseURL: envConfig.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const apiBase = axios.create(axiosConfig);
  return { apiBase };
};
```

### 6.8 Helpers de Cache TanStack Query

```ts
// utils/tanstackQueryHelpers/addItemInQueryCache.ts
import { QueryKey } from "@tanstack/react-query";
import { queryClient } from "@/utils/tanstackQueryHelpers/queryClient";

interface AddItemInQueryCacheOptions<T> {
  queryKeyPrefix: QueryKey;
  newItem: T;
  position?: "start" | "end";
}

export function addItemInQueryCache<T extends Record<string, any>>({
  queryKeyPrefix,
  newItem,
  position = "start",
}: AddItemInQueryCacheOptions<T>) {
  queryClient.setQueriesData<T[]>(
    { queryKey: queryKeyPrefix, exact: false },
    (oldData) => {
      if (!oldData) return oldData;
      if (Array.isArray(oldData)) {
        return position === "start"
          ? [newItem, ...oldData]
          : [...oldData, newItem];
      }
      return oldData;
    },
  );
}
```

### 6.9 Roteamento com Lazy Loading

```tsx
// routes/AppRouter.tsx
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Providers } from "@/providers";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTE_PATTERNS } from "./routes";
import { Spinner } from "@/components/ui/feedback/Spinner";

// Lazy loading de todas as páginas
const HomePage = lazy(() => import("@/pages/HomePage"));
const ExercisesPage = lazy(() => import("@/pages/ExercisesPage"));

// Wrapper único de Suspense
function SuspenseWrapper({ element }: { element: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <Spinner size={64} />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    element: <Providers />,
    children: [
      { index: true, element: <Navigate to={ROUTE_PATTERNS.LOGIN} replace /> },
      {
        path: ROUTE_PATTERNS.HOME,
        element: <SuspenseWrapper element={<HomePage />} />,
      },
      // Rotas protegidas por role
      {
        element: <ProtectedRoute roles={["ADMIN"]} />,
        children: [
          {
            path: ROUTE_PATTERNS.EXERCISES,
            element: <SuspenseWrapper element={<ExercisesPage />} />,
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
```

### 6.10 Query Params com Nuqs

```ts
// Exemplo de uso de Nuqs para filtros e paginação
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

export const useExerciseFilters = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [keyword, setKeyword] = useQueryState(
    "keyword",
    parseAsString.withDefault(""),
  );
  const [difficulty, setDifficulty] = useQueryState(
    "difficulty",
    parseAsString.withDefault(""),
  );
  const [showCreateModal, setShowCreateModal] = useQueryState("create", {
    defaultValue: false,
    parse: (v) => v === "true",
    serialize: (v) => (v ? "true" : ""),
  });

  return {
    page,
    setPage,
    keyword,
    setKeyword,
    difficulty,
    setDifficulty,
    showCreateModal,
    setShowCreateModal,
  };
};
```

---

## 7. Configurações de Ferramentas

### 7.1 ESLint (`eslint.config.mjs`)

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "react-refresh/only-export-components": "off",
    },
  },
]);
```

### 7.2 TypeScript (`tsconfig.json` recomendado)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 7.3 Vite (`vite.config.ts` recomendado)

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
    svgr(),
  ],
  server: {
    port: 3000,
  },
});
```

### 7.4 CSS Global (`src/style/index.css`)

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Breakpoints customizados */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1440px;

  /* Border radius derivados */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* Mapeamento de CSS variables para Tailwind utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-info: var(--info);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-card: var(--card);
  --color-surface: var(--surface);
}

:root {
  --radius: 0.875rem;

  /* Tema escuro como padrão (Discord-inspired) */
  --background: oklch(0.14 0.02 275);
  --foreground: oklch(0.985 0.005 275);
  --surface: oklch(0.18 0.02 275);
  --card: oklch(0.18 0.02 275);
  --primary: oklch(0.62 0.22 275); /* blurple */
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.26 0.03 275);
  --secondary-foreground: oklch(0.985 0.005 275);
  --muted: oklch(0.24 0.02 275);
  --muted-foreground: oklch(0.72 0.02 275);
  --accent: oklch(0.32 0.05 275);
  --accent-foreground: oklch(0.985 0.005 275);
  --destructive: oklch(0.58 0.22 25);
  --success: oklch(0.68 0.17 150);
  --warning: oklch(0.75 0.17 55);
  --info: oklch(0.68 0.17 250);
  --border: oklch(0.28 0.02 275);
  --input: oklch(0.26 0.02 275);
  --ring: oklch(0.62 0.22 275);
}

@layer base {
  * {
    border-color: var(--border);
  }
  html {
    scroll-behavior: smooth;
    color-scheme: dark;
  }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    -webkit-font-smoothing: antialiased;
  }
}
```

### 7.5 QueryClient (`src/utils/tanstackQueryHelpers/queryClient.ts`)

```ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false, // Desabilitado por padrão — cada hook habilita explicitamente
      gcTime: Infinity, // Cache nunca é coletado pelo GC
      staleTime: 1000 * 60 * 5, // 5 minutos de stale time padrão
    },
  },
});
```

### 7.6 Variáveis de Ambiente (`src/utils/envConfig.ts`)

```ts
// Centraliza todas as variáveis de ambiente com tipagem
export const envConfig = {
  BASE_API_URL:
    import.meta.env.VITE_BASE_API_URL ?? "http://localhost:3001/api",
  APP_ENV: import.meta.env.VITE_APP_ENV ?? "development",
};
```

```env
# .env.local
VITE_BASE_API_URL=http://localhost:3001/api
VITE_APP_ENV=development
```

---

## 8. Padrões de Git e Commits

### 8.1 Conventional Commits

Formato: `<tipo>(<escopo>): <descrição>`

| Tipo       | Quando Usar                                |
| ---------- | ------------------------------------------ |
| `feat`     | Nova funcionalidade                        |
| `fix`      | Correção de bug                            |
| `refactor` | Refatoração sem mudança de comportamento   |
| `style`    | Mudanças de formatação/estilo (sem lógica) |
| `docs`     | Documentação                               |
| `test`     | Adição ou correção de testes               |
| `chore`    | Tarefas de manutenção (deps, config)       |
| `perf`     | Melhoria de performance                    |
| `ci`       | Mudanças em CI/CD                          |

**Exemplos:**

```
feat(exercise): add difficulty filter to exercises list
fix(auth): prevent redirect loop on token expiration
refactor(user): extract useFetchUsers to separate file
chore(deps): upgrade tanstack-query to v5.100
docs: add STARTKIT.md with project architecture guide
```

### 8.2 Estratégia de Branches

```
main          → Produção (protegida, só via PR)
develop       → Integração (base para features)
feature/<nome> → Nova funcionalidade (ex: feature/exercise-filter)
fix/<nome>    → Correção de bug (ex: fix/auth-redirect-loop)
hotfix/<nome> → Correção urgente em produção
chore/<nome>  → Manutenção (ex: chore/upgrade-deps)
```

### 8.3 Fluxo de PR

1. Criar branch a partir de `develop`
2. Implementar a feature/fix
3. Abrir PR para `develop` com descrição clara
4. Code review obrigatório
5. Merge via squash (mantém histórico limpo)

---

## 9. Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

| Script                | Comando        | Quando Usar                                                         |
| --------------------- | -------------- | ------------------------------------------------------------------- |
| **Desenvolvimento**   | `yarn dev`     | Inicia o servidor de desenvolvimento com HMR na porta 3000          |
| **Build de produção** | `yarn build`   | Compila TypeScript e gera bundle otimizado em `dist/`               |
| **Preview do build**  | `yarn preview` | Serve o build de produção localmente para validação antes do deploy |

**Scripts adicionais recomendados para adicionar:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 10. Checklist de Novo Projeto

### Fase 1 — Inicialização

- [ ] Criar projeto com Vite: `yarn create vite <nome> --template react-ts`
- [ ] Instalar todas as dependências do `package.json` deste startkit
- [ ] Configurar `tsconfig.json` com `strict: true` e path alias `@/*`
- [ ] Configurar `vite.config.ts` com plugins: `react`, `tailwindcss`, `tsconfigPaths`, `svgr`
- [ ] Configurar `eslint.config.mjs` com regras TypeScript e React Hooks
- [ ] Criar arquivo `.env.local` com `VITE_BASE_API_URL`
- [ ] Criar `src/utils/envConfig.ts` para centralizar variáveis de ambiente

### Fase 2 — Estrutura Base

- [ ] Criar estrutura de pastas: `src/modules/`, `src/pages/`, `src/components/`, `src/hooks/`, `src/stores/`, `src/utils/`, `src/types/`, `src/routes/`, `src/style/`
- [ ] Criar `src/style/index.css` com Tailwind v4, CSS variables (design tokens) e tema OKLCH
- [ ] Criar `src/utils/tanstackQueryHelpers/queryClient.ts` com configurações padrão
- [ ] Criar todos os helpers de cache em `src/utils/tanstackQueryHelpers/`
- [ ] Criar `src/utils/constants.ts` com `CONSTANTS.VALIDATION` e `CONSTANTS.LOCAL_STORAGE_KEYS`
- [ ] Criar `src/utils/isType.ts` com type guards
- [ ] Criar `src/utils/cn.ts` com `clsx` + `tailwind-merge`
- [ ] Criar `src/types/paginated.ts` com `IPaginatedDocs<T>` e `IPaginationParams`

### Fase 3 — Autenticação e Roteamento

- [ ] Criar `src/routes/routes.ts` com `ROUTE_PATTERNS` e `ROUTES`
- [ ] Criar `src/routes/ProtectedRoute.tsx` com verificação de autenticação e roles
- [ ] Criar `src/routes/AppRouter.tsx` com `createBrowserRouter` e lazy loading
- [ ] Criar `src/providers.tsx` com `QueryClientProvider`, `NuqsAdapter` e `Outlet`
- [ ] Criar `src/hooks/useAxios.ts` com Bearer token automático via sessionStorage
- [ ] Criar `src/pages/AuthLoginPage.tsx`

### Fase 4 — Primeiro Módulo de Domínio

- [ ] Criar pasta `src/modules/<entidade>/`
- [ ] Criar `types/<Entidade>QueryKeys.ts` com enum de query keys
- [ ] Criar `types/<Entidade>.ts` com interface `I<Entidade>` e enums de status
- [ ] Criar `utils/<entidade>QueryKeyFactory.ts` com factory de query keys
- [ ] Criar `hooks/useFetch<Entidade>s.ts` para lista paginada
- [ ] Criar `hooks/useGetCached<Entidade>Row.ts` para leitura de cache
- [ ] Criar `schema/<entidade>FormSchema.ts` com Zod + tipo inferido + hook `use<Entidade>FormSchema`
- [ ] Criar `components/<NomeComponente>/index.tsx` com `memo` + `forwardRef`
- [ ] Criar `components/<NomeComponente>/use<NomeComponente>.ts` com lógica extraída

### Fase 5 — Design System

- [ ] Instalar componentes shadcn/ui necessários via `npx shadcn@latest add <componente>`
- [ ] Customizar CSS variables no `index.css` para a identidade visual do projeto
- [ ] Criar componentes de feedback: `Spinner`, `Toast`, `NotFound404`
- [ ] Criar layouts: `InLayout` (autenticado), `AuthLayout` (login)
- [ ] Criar `src/stores/` com stores Zustand para estado global de UI

### Fase 6 — Qualidade e Deploy

- [ ] Configurar `.gitignore` (node_modules, dist, .env.local)
- [ ] Configurar GitHub Actions para lint + type-check em PRs
- [ ] Criar `README.md` com instruções de setup e desenvolvimento
- [ ] Validar build de produção: `yarn build && yarn preview`
- [ ] Configurar variáveis de ambiente no ambiente de deploy (Vercel, Netlify, etc.)

---

## 11. Boas Práticas e Regras do Projeto

### ✅ FAÇA

#### Arquitetura

- **Sempre** use o alias `@/` para importações absolutas (`@/hooks/useAxios`)
- **Sempre** importe do arquivo de origem, nunca de um `index.ts` de re-export
- **Sempre** crie um módulo em `src/modules/` para cada feature de negócio
- **Sempre** use enums para query keys (`ExerciseQueryKeys.Exercises`)
- **Sempre** use a factory de query keys (`exerciseQueryKeyFactory.exercisesList(params)`)
- **Sempre** extraia lógica pesada do JSX para um hook local `use<NomeComponente>.ts`
- **Sempre** use `React.memo` + `React.forwardRef` + `displayName` em componentes de lista

#### TanStack Query

- **Sempre** use `useAxios()` para obter a instância do Axios (nunca instancie diretamente)
- **Sempre** popule o cache individual (`setItemInCache`) ao iterar sobre listas
- **Sempre** use `staleTime: Infinity` e `gcTime: Infinity` em hooks de leitura de cache
- **Sempre** use `enabled: !!id` em hooks que dependem de um ID
- **Sempre** use `retry: 0` em mutations
- **Sempre** use `useMemo` para normalizar params antes de passar para `useQuery`
- **Nunca** importe `useQuery`/`useMutation` diretamente em componentes ou páginas
- **Nunca** use `queryClient` diretamente fora de `src/utils/tanstackQueryHelpers/`

#### Formulários

- **Sempre** exporte 3 artefatos por arquivo de schema: schema Zod, tipo inferido, hook `use<Entidade>FormSchema`
- **Sempre** use `CONSTANTS.VALIDATION.REQUIRED_FIELD` para mensagens de erro padrão
- **Sempre** use `Controller` do React Hook Form para campos controlados
- **Sempre** use `reset()` dentro de `useEffect` para popular formulários no modo edição

#### Roteamento

- **Sempre** use `React.lazy()` para todas as páginas
- **Sempre** use `ROUTES.<ROTA>` para navegação (nunca strings inline)
- **Sempre** use `ROUTE_PATTERNS.<ROTA>` para declaração no router
- **Nunca** passe objetos via `location.state` — use `:id` como param de rota ou Nuqs

#### Design e Estilização

- **Sempre** use CSS variables semânticas (`bg-primary`, `text-muted-foreground`)
- **Sempre** use OKLCH para definir cores no CSS
- **Sempre** use `cn()` (clsx + tailwind-merge) para classes condicionais
- **Nunca** hardcode cores hex ou rgb em componentes

#### TypeScript

- **Sempre** prefixe interfaces com `I` (`IUser`, `IExercise`)
- **Sempre** use enums para status e tipos de entidades
- **Sempre** infira tipos de schemas Zod com `z.in

- **Sempre** infira tipos de schemas Zod com `z.infer<typeof schema>` (nunca duplique tipos)

### ❌ NÃO FAÇA

#### Arquitetura

- **Nunca** crie `index.ts` / `index.tsx` apenas para re-exportar outros módulos
- **Nunca** coloque lógica de negócio em páginas (`src/pages/`) — páginas são finas
- **Nunca** crie uma pasta de módulo sem necessidade real (só crie `schema/`, `types/`, `utils/` se precisar)
- **Nunca** use importações relativas longas (`../../../hooks/useAxios`) — use `@/`

#### TanStack Query

- **Nunca** aceite um parâmetro genérico `enabled: boolean` em hooks — o hook deriva sua própria condição
- **Nunca** crie mais de um hook TanStack Query por arquivo
- **Nunca** use strings avulsas como query keys — sempre use enums ou factories
- **Nunca** force um refetch quando pode atualizar o cache diretamente (prefira `setItemInCache` a `invalidateQueries`)

#### Formulários

- **Nunca** coloque lógica de formulário inline no JSX — extraia para `use<Componente>.ts`
- **Nunca** duplique mensagens de erro — use `CONSTANTS.VALIDATION`
- **Nunca** crie schemas Zod sem exportar o tipo inferido

#### Design

- **Nunca** hardcode valores de cor (`#2b7fff`, `rgb(43, 127, 255)`) em componentes
- **Nunca** crie um novo arquivo CSS para adicionar cores — edite apenas `index.css`
- **Nunca** use `!important` para sobrescrever estilos — use a hierarquia de variantes CVA

#### Performance

- **Nunca** passe objetos inteiros para componentes de linha de lista — passe apenas o `id` e deixe o componente ler do cache
- **Nunca** use `useShallow` sem separar state e actions em chamadas distintas ao Zustand
- **Nunca** deixe `gcTime` padrão em queries de cache-only — use `Infinity`

---

## Apêndice — Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        src/                                  │
│                                                              │
│  main.tsx → App.tsx → AppRouter.tsx                          │
│                            │                                 │
│                     Providers.tsx                            │
│              ┌─────────────┼──────────────┐                  │
│         AblyProvider  QueryClient    NuqsAdapter             │
│                            │                                 │
│                       pages/ (finas)                         │
│                            │                                 │
│              ┌─────────────┼──────────────┐                  │
│         modules/      components/      hooks/                │
│              │                                               │
│    ┌─────────┼─────────┐                                     │
│  types/  hooks/  components/  schema/  utils/                │
│              │                                               │
│    ┌─────────┼─────────┐                                     │
│  useQuery  useMutation  useAxios                             │
│              │                                               │
│    tanstackQueryHelpers/ (cache helpers)                     │
│              │                                               │
│         queryClient (singleton)                              │
└─────────────────────────────────────────────────────────────┘

Fluxo de dados:
URL params (Nuqs) ──→ hooks de filtro
                           │
                    useFetch<Entidade>s
                           │
                    useAxios → API REST
                           │
                    TanStack Query Cache
                           │
              ┌────────────┴────────────┐
         componentes              outros hooks
         (leem cache)          (leem cache via
                               useGetCached*)
```

---

## Apêndice — Theming OKLCH

O projeto usa **OKLCH** como formato de cor padrão. OKLCH é perceptualmente uniforme, o que significa que mudanças de lightness são visualmente consistentes.

```
oklch(lightness chroma hue)
  │         │       │
  │         │       └── 0-360° (matiz: 0=vermelho, 120=verde, 240=azul, 275=roxo)
  │         └────────── 0-0.4 (saturação: 0=cinza, 0.4=muito saturado)
  └──────────────────── 0-1 (brilho: 0=preto, 1=branco)
```

**Paleta base do projeto (Discord-inspired):**

| Token                | Valor OKLCH             | Uso                       |
| -------------------- | ----------------------- | ------------------------- |
| `--background`       | `oklch(0.14 0.02 275)`  | Fundo da página           |
| `--surface`          | `oklch(0.18 0.02 275)`  | Cards e painéis           |
| `--surface-2`        | `oklch(0.22 0.025 275)` | Superfície elevada        |
| `--primary`          | `oklch(0.62 0.22 275)`  | Blurple — ações primárias |
| `--muted-foreground` | `oklch(0.72 0.02 275)`  | Texto secundário          |
| `--border`           | `oklch(0.28 0.02 275)`  | Bordas                    |
| `--destructive`      | `oklch(0.58 0.22 25)`   | Erros e ações destrutivas |
| `--success`          | `oklch(0.68 0.17 150)`  | Sucesso                   |
| `--warning`          | `oklch(0.75 0.17 55)`   | Avisos                    |
| `--info`             | `oklch(0.68 0.17 250)`  | Informações               |

---

_Documento gerado em 2026-08-12. Baseado no codebase real do projeto frontend-run-code._
