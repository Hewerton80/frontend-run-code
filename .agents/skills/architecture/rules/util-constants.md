# util-constants: Use `CONSTANTS` para Mensagens de Erro e Chaves de Storage

## Prioridade: HIGH

## Explicação

O projeto centraliza todas as mensagens de erro e chaves de `localStorage`/`sessionStorage`
no objeto `CONSTANTS` em `src/utils/constants.ts`.

Nunca use strings literais para mensagens de validação ou chaves de storage — sempre
referencie `CONSTANTS.ERROR_MESSAGES` e `CONSTANTS.STORAGE_KEYS`.

## API Disponível

```ts
import { CONSTANTS } from "@/utils/constants";

// Mensagens de erro para schemas Zod e validações manuais
CONSTANTS.ERROR_MESSAGES.REQUIRED_FIELDS; // "campo obrigatório"
CONSTANTS.ERROR_MESSAGES.INVALID_FILE; // "Deve ser um arquivo válido"
CONSTANTS.ERROR_MESSAGES.INVALID_DATE; // "Data inválida"
CONSTANTS.ERROR_MESSAGES.INVALID_TIME; // "Hora inválida"
CONSTANTS.ERROR_MESSAGES.INVALID_PHONE; // "Número de telefone inválido"
CONSTANTS.ERROR_MESSAGES.INVALID_MAX_FILE; // "A imagem deve possuir no máximo 2 mb."
CONSTANTS.ERROR_MESSAGES.INVALID_PASSWORD; // "Senha inválida"
CONSTANTS.ERROR_MESSAGES.INAVALID_URL; // "URL inválida"
CONSTANTS.ERROR_MESSAGES.PASSWORDS_NOT_MATCH; // "As senhas não coincidem. Por favor, tente novamente"
CONSTANTS.ERROR_MESSAGES.ONLY_NUMBERS; // "Apenas números são permitidos"

// Chaves de localStorage/sessionStorage
CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN; // "ACCESS_TOKEN"
CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN; // "REFRESH_TOKEN"
CONSTANTS.STORAGE_KEYS.EXPIRES_IN; // "EXPIRES_IN"
CONSTANTS.STORAGE_KEYS.USER; // "USER"
CONSTANTS.STORAGE_KEYS.WELL_COME; // "WELL_COME"
CONSTANTS.STORAGE_KEYS.TOUR; // "TOUR"
```

## Exemplo Incorreto

```ts
// ❌ String literal de mensagem de erro — sem consistência entre formulários
z.string().min(1, { message: "Campo obrigatório" });
z.string().min(1, { message: "campo obrigatório" }); // capitalização diferente
z.string().min(1, { message: "Obrigatório" }); // texto diferente

// ❌ String literal de chave de storage
localStorage.getItem("ACCESS_TOKEN");
localStorage.setItem("access_token", token); // inconsistência de case
```

## Exemplo Correto

```ts
// ✅ Schemas Zod
import { CONSTANTS } from "@/utils/constants";

const { ERROR_MESSAGES } = CONSTANTS;

export const mySchema = z.object({
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELDS }),
  phone: z
    .string()
    .refine((v) => v.match(regex.phone), {
      message: ERROR_MESSAGES.INVALID_PHONE,
    }),
});

// ✅ Acesso ao storage
import { CONSTANTS } from "@/utils/constants";

const token = localStorage.getItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
localStorage.setItem(CONSTANTS.STORAGE_KEYS.USER, JSON.stringify(user));
```

## Contexto

- Se precisar de uma mensagem de erro ainda não mapeada, adicione-a em
  `CONSTANTS.ERROR_MESSAGES` — nunca inline no schema.
- Se precisar de uma nova chave de storage, adicione-a em `CONSTANTS.STORAGE_KEYS`.
- O padrão `const { ERROR_MESSAGES } = CONSTANTS` no topo do arquivo de schema
  evita repetir `CONSTANTS.` em cada campo.
- Referência: `src/utils/constants.ts`
