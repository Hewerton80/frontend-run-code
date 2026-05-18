# arch-global-structure: Estrutura Global de `src/`

## Prioridade: CRITICAL

## Explicação

O projeto segue uma separação clara de responsabilidades em nível de pasta dentro de `src/`.
Conhecer onde cada tipo de arquivo pertence é o passo zero antes de criar qualquer coisa.

## Árvore de Referência

```
src/
├── App.tsx                 # Raiz da aplicação
├── main.tsx                # Entry point (monta Providers + App)
├── routes                  # Declaração de todas as rotas
├── @types/                 # Declarações globais de tipos TypeScript
├── components/             # Componentes compartilhados reutilizáveis (UI, icons, helpers)
│   ├── icons/              # Ícones SVG exportados como componentes React
│   ├── ui/                 # Design system (buttons, forms, overlay, feedback, layout…)
│   └── helpers/            # Utilitários de CSS (módulos de animação, etc.)
├── hooks/
│   ├── useBaseApi.ts       # Hooks utilitários (useBaseApi, useAlertModal, etc.)
│   └── ...
├── style/
│   ├── index.css           # Estilos globais Tailwind
│   ├── utils.css           # Classes utilitárias personalizadas (ex: text-ellipsis)
├── domains/                # Módulos de domínio — cada feature tem o seu (ver arch-module-structure)
├── pages/                  # Páginas: compõem componentes de módulos, não contêm lógica
├── providers/              # Provedores globais (QueryClient, Alert, NuqsAdapter)
├── types/                  # Tipos globais compartilhados entre múltiplos módulos
└── utils/                  # Funções utilitárias puras + helpers globais
    ├── tanstakQueryHelpers/ # Helpers de cache (setItemInCache, getItemFromQueryCache, queryClient…)
    ├── constants.ts         # Constantes globais (ERROR_MESSAGES, STORAGE_KEYS, etc.)
    ├── regex.ts             # Expressões regulares reutilizáveis
    ├── date.ts / dateTime.ts# Formatações e conversões de data
    ├── isType.ts            # Type guards (isString, isNumber, isFile, etc.)
    ├── removeEmptyKeys.ts   # Remove chaves com valor vazio/nulo de objetos
    ├── file.ts              # Utilitários de arquivo (validação de tamanho, tipo, etc.)
    ├── toBase64.ts          # Converte File para base64
    ├── hookFormHelpers.ts   # Helpers para React Hook Form (ex: getOnlyDirtyFields)
    └── zodHelpers.ts        # Helpers de validação Zod
```

## Onde Criar Cada Tipo de Arquivo

| O que criar                       | Onde fica                                       |
| --------------------------------- | ----------------------------------------------- |
| Novo módulo de domínio            | `src/domains/<nome>/`                           |
| Componente compartilhado          | `src/components/ui/` ou `src/components/icons/` |
| Hook de API sem módulo específico | `src/hooks/apis/`                               |
| Hook utilitário genérico          | `src/hooks/utils/`                              |
| Tipo global usado em 2+ módulos   | `src/types/`                                    |
| Utilitário puro global            | `src/utils/`                                    |
| Nova página/rota                  | `src/pages/` + registrar em `src/Routes.tsx`    |
| Tudo que pertence a um domínio    | Dentro de `src/domains/<nome>/`                 |

## Contexto

- Se um utilitário ou tipo é usado por **apenas um módulo**, ele fica **dentro** do módulo.
- Só promova para `src/utils/` ou `src/types/` quando o código for reaproveitado por 2+ módulos.
