import { AuthQueryKeys } from "@/modules/auth/types/AuthQueryKeys";

/**
 * Factory de query keys do módulo auth.
 * Use sempre esta factory em vez de arrays inline para garantir
 * consistência, autocomplete e refatoração segura.
 */
export const authQueryKeyFactory = {
  /** Chave do usuário autenticado (/auth/me) */
  me: () => [AuthQueryKeys.Me] as const,
};
