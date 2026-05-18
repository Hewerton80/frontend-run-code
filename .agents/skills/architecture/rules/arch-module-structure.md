# arch-module-structure: Estrutura Interna de um Módulo de Domínio

## Prioridade: CRITICAL

## Explicação

Cada módulo em `src/domains/` agrupa toda a lógica de uma feature de negócio.
O módulo `coupon` é o **modelo de referência** que todos os outros devem seguir.

Só crie as pastas que forem necessárias — não crie `schema/`, `types/` ou `utils/`
se o módulo não precisar delas.

## Estrutura Padrão

```
domains/<nome-do-modulo>/
├── components/             # Componentes específicos deste módulo
│   └── <NomeComponente>/
│       ├── index.tsx                 # JSX do componente (memo + forwardRef quando necessário)
│       ├── use<NomeComponente>.ts    # Hook local — toda lógica extraída do JSX
│       └── ...                       # Sub-componentes ou arquivos adicionais, se necessário
├── hooks/                  # Hooks de dados do módulo
│   ├── useFetch<Entidade>s.ts        # Busca lista paginada + semeia cache individual
│   ├── useFetch<Entidade>ById.ts     # Busca item por ID com cache-first
│   ├── useGet<Entidade>FromCache.ts  # Lê item já cacheado (sem HTTP)
│   ├── useCreate<Entidade>.ts        # Mutation de criação
│   └── useUpdate<Entidade>.ts        # Mutation de edição
├── schema/                 # Schemas Zod + tipos inferidos + instância do useForm
│   └── <entidade>FormSchema.ts       # 3 exports: schema, tipo, hook (ver react-hook-form-zod)
├── types/                  # Tipos e enums de domínio
│   ├── <Entidade>.ts                 # Interface principal + enums de status/tipo
│   └── <Entidade>QueryKeys.ts        # Enum com as query keys do TanStack Query
└── utils/                  # Funções puras específicas do módulo
    ├── handle<Entidade>Params.ts     # Normaliza/sanitiza parâmetros de query
    ├── update<Entidade>InCache.ts    # Atualização otimista no cache
    └── forceRefetchCached<Entidade>.ts # Invalida a lista da entidade
```

## Exemplo Real — Módulo `coupon`

```
domains/coupon/
├── components/
│   ├── CoupomForm/
│   │   ├── index.tsx
│   │   └── useCouponForm.ts
│   ├── CouponRow/
│   │   └── index.tsx
│   └── CouponTableActions/
│       └── index.tsx
├── hooks/
│   ├── useFetchCoupons.ts
│   ├── useFetchCouponById.ts
│   ├── useGetCouponFromCache.ts
│   ├── useCreateCoupon.ts
│   └── useUpdateCoupon.ts
├── schema/
│   └── coupomFormSchema.ts
├── types/
│   ├── Coupon.ts
│   └── CouponQueryKeys.ts
└── utils/
    ├── handleCouponsParams.ts
    ├── updateCouponInCache.ts
    └── forceRefetchCachedCoupons.ts
```

## Contexto

- Nunca coloque lógica de negócio diretamente em `pages/` — ela pertence aos hooks do módulo.
- A pasta `schema/` existe apenas para módulos que têm formulários.
- `types/` é obrigatória para todo módulo que expõe uma entidade com ID.
