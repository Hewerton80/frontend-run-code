/**
 * Enum de query keys do módulo user.
 * Nota: o enum legado `UserKey.List = "List"` era compartilhado entre users e teachers,
 * o que causava colisão de cache. Aqui os valores são separados corretamente.
 */
export enum UserQueryKeys {
  /** Lista paginada de usuários */
  Users = "users",
  /** Cache individual de uma linha de usuário (seed pela lista) */
  UserRow = "userRow",
  /** Lista de professores (com filtro opcional por keyword) */
  Teachers = "teachers",
}
