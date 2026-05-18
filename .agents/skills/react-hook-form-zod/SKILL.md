---
name: react-hook-form-zod
description: >
  Padrões de React Hook Form v7 + Zod v3 do projeto.
  Use SEMPRE que o usuário pedir para criar ou editar um formulário, schema de validação,
  hook de formulário, ou qualquer componente que use `useForm`, `Controller`, `zodResolver`,
  `z.object`, `z.refine` ou campos de arquivo/imagem em formulários.
  O módulo `coupon` é a referência canônica desses padrões.
---

# React Hook Form + Zod

Guia completo para criação de formulários no projeto com React Hook Form v7 e Zod v3.
Baseado no padrão real do módulo `coupon` — a referência canônica do codebase.

## Quando Aplicar

- Criando um novo formulário em qualquer módulo
- Criando ou editando um schema Zod
- Criando o hook local de um componente de formulário (`use<Component>.ts`)
- Renderizando campos com `Controller` + `FormControl`
- Implementando formulários de criação **ou** edição
- Adicionando validação de arquivo/imagem
- Adicionando validação cruzada entre campos

## Categorias de Regras

| Prioridade | Categoria          | Regras   | Impacto                                               |
| ---------- | ------------------ | -------- | ----------------------------------------------------- |
| CRITICAL   | Schema             | 3 regras | Consistência, tipagem e reutilização                  |
| HIGH       | Hook do formulário | 4 regras | Separação de lógica, estabilidade e prevenção de bugs |
| MEDIUM     | Submissão          | 1 regra  | Envio correto e otimista de dados                     |

## Quick Reference

### Schema (Prefix: `schema-`)

- `schema-structure` — 3 exports por arquivo: schema Zod, tipo inferido e hook `use<Entity>FormSchema`
- `schema-cross-field-validation` — Use `.refine()` encadeado com `path` para validações entre campos
- `schema-file-image-fields` — Use `z.union([z.string(), z.any().refine(...)])` para campos de arquivo/imagem

### Hook do Formulário (Prefix: `hook-`)

- `hook-extract-form-logic` — Toda lógica de formulário fica em `use<Component>.ts`, nunca inline no JSX
- `hook-memo-form-methods` — Estabilize o retorno de `useForm` com `useMemo` antes de desestruturar
- `hook-watch-subscription` — Use `watch()` com subscribe/unsubscribe para efeitos colaterais entre campos
- `hook-populate-edit-form` — Use `reset()` dentro de `useEffect` para popular o formulário no modo edição

### Submissão (Prefix: `submit-`)

- `submit-handler-pattern` — Trigger → validar → dirty fields → mutation → atualizar cache

## Como usar

Leia os arquivos de regra individuais para explicações detalhadas e exemplos de código:

```
rules/schema-structure.md
rules/hook-submit-handler.md
```

Cada arquivo contém:

- Explicação de por que o padrão importa
- Exemplo incorreto com explicação
- Exemplo correto com explicação
- Contexto adicional e referências ao codebase
