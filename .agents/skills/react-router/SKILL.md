---
name: react-router
description: >
  Guia de arquitetura e boas práticas de React Router v7 para o projeto portal.odisseia.
  Use SEMPRE que o usuário pedir para adicionar uma nova rota, criar um novo módulo com
  páginas, implementar proteção de rota, adicionar um provider escopado a um fluxo de
  navegação, usar lazy loading em páginas, navegar programaticamente, criar links, ou
  tiver dúvidas sobre onde declarar rotas, como nomear constantes de path, ou como
  estruturar layouts aninhados. Esta skill define o padrão definitivo de roteamento do
  projeto.
---

# React Router — portal.odisseia

Guia completo para roteamento no projeto com React Router v7.
Baseado no padrão real de `src/router/` — a referência canônica do codebase.

## Quando Aplicar

- Adicionando uma nova rota ou página ao projeto
- Criando ou editando constantes de path em `routes.ts`
- Implementando proteção de rota (autenticação)
- Montando providers que precisam de hooks do router
- Criando layouts escopados a fluxos multi-step
- Navegando programaticamente ou criando links internos
- Configurando lazy loading em páginas

## Categorias de Regras

| Prioridade | Categoria             | Regras  | Impacto                                      |
| ---------- | --------------------- | ------- | -------------------------------------------- |
| CRITICAL   | Estrutura de arquivos | 1 regra | Fundação de toda a configuração de rotas     |
| CRITICAL   | Constantes de path    | 1 regra | Única fonte de verdade de URLs               |
| CRITICAL   | Lazy loading          | 1 regra | Performance do bundle inicial                |
| HIGH       | ProtectedRoute        | 1 regra | Segurança e UX de autenticação               |
| HIGH       | RootProviders         | 1 regra | Acesso a hooks do router dentro de providers |
| HIGH       | Feature Layouts       | 1 regra | Escopo e ciclo de vida de contextos de fluxo |
| HIGH       | Estado entre rotas    | 1 regra | Evitar dados voláteis e quebra no deep link  |
| MEDIUM     | Navegação             | 1 regra | Consistência e evitar full page reload       |
| MEDIUM     | Adicionando nova rota | 1 regra | Checklist para não esquecer nenhum passo     |

## Quick Reference

### Estrutura e Constantes (CRITICAL)

- `router-file-structure` — Mapa de `src/router/` e responsabilidade de cada arquivo
- `router-routes-constants` — `ROUTES` (navegação) vs `ROUTE_PATTERNS` (declaração), funções para `:id`

### Lazy Loading e Layouts (CRITICAL / HIGH)

- `router-lazy-loading` — `React.lazy()` obrigatório + `SuspenseWrapper` como único wrapper
- `router-protected-route` — `isLoading` antes de redirecionar, `state.from`, `replace`
- `router-root-providers` — Por que providers com `useNavigate` devem ficar dentro do router
- `router-feature-layout` — Layouts escopados a fluxos multi-step com Provider local

### Estado entre Rotas (HIGH)

- `router-state-between-routes` — Nunca passar objetos via `location.state`; use `:id` como param de rota, query params (Nuqs) ou Context escopado (Feature Layout)

### Navegação e Checklist (MEDIUM)

- `router-navigation` — `navigate()`, `<Link>`, anti-patterns (`<a href>`, strings inline)
- `router-add-route` — Checklist completo para adicionar uma nova rota ao projeto

## Como usar

Leia os arquivos de regra individuais para explicações detalhadas e exemplos de código:

```
rules/router-file-structure.md
rules/router-routes-constants.md
rules/router-lazy-loading.md
rules/router-protected-route.md
rules/router-root-providers.md
rules/router-feature-layout.md
rules/router-state-between-routes.md
rules/router-navigation.md
rules/router-add-route.md
```

Cada arquivo contém:

- Explicação de por que o padrão importa
- Exemplo incorreto com explicação
- Exemplo correto com explicação
- Contexto adicional e referências ao codebase
