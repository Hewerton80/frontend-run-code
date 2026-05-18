# arch-providers: Providers Globais e Ordem de Wrap

## Prioridade: MEDIUM

## Explicação

Os providers globais ficam em `src/providers/index.tsx` e são montados em uma ordem específica
por causa de dependências entre eles.

## Ordem de Wrap (de fora para dentro)

```tsx
// ✅ src/providers/index.tsx
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/tanstakQueryHelpers/queryClient";
import { AlertContextProvider } from "./alertContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      {" "}
      {/* 1. NuqsAdapter — mais externo */}
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* 2. TanStack Query */}
        <AlertContextProvider>
          {" "}
          {/* 3. Alert modal global */}
          {children}
        </AlertContextProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
```

## Por que essa Ordem?

| Provider               | Dependência                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `NuqsAdapter`          | Deve envolver tudo — acessa o router do React Router v7      |
| `QueryClientProvider`  | Deve envolver qualquer hook que usa `useQuery`/`useMutation` |
| `AlertContextProvider` | Pode usar hooks do TanStack Query internamente               |

## Stack Tecnológica Completa

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

## Contexto

- O `queryClient` é um singleton exportado de `src/utils/tanstakQueryHelpers/queryClient.ts`.
- Ao adicionar um novo provider global, inclua-o em `src/providers/index.tsx` na posição
  correta — nunca em `src/main.tsx` diretamente.
