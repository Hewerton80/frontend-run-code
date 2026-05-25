/**
 * Enum de query keys do módulo list.
 * `Lists` mantém o valor legado de `ListQueryKey.LIST` para compatibilidade de cache.
 */
export enum ListQueryKeys {
  /** Lista paginada de listas de exercícios */
  Lists = "LIST_EXERCISE",
  /** Detalhe de uma lista com seus exercícios (por listId + classroomId) */
  List = "list-detail",
}
