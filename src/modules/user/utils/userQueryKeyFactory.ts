import { UserQueryKeys } from "@/modules/user/types/UserQueryKeys";

/**
 * Factory de query keys do módulo user.
 * Use sempre esta factory em vez de arrays inline para garantir
 * consistência, autocomplete e invalidação segura.
 *
 * Hierarquia:
 *   users → usersList(params)
 *   teachers → teachersList(params)
 */
export const userQueryKeyFactory = {
  /** Raiz de todas as queries de lista paginada de usuários */
  users: () => [UserQueryKeys.Users] as const,

  /** Lista paginada de usuários com params normalizados */
  usersList: (params?: object) =>
    [...userQueryKeyFactory.users(), params] as const,

  /** Cache individual de uma linha de usuário (seed pela lista) */
  userRow: (userId?: string | null) => [UserQueryKeys.UserRow, userId] as const,

  /** Raiz de todas as queries de professores */
  teachers: () => [UserQueryKeys.Teachers] as const,

  /** Lista de professores com params normalizados (ex: filtro por keyword) */
  teachersList: (params?: object) =>
    [...userQueryKeyFactory.teachers(), params] as const,
};
