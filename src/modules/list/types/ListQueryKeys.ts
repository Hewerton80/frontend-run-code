/**
 * Enum de query keys do módulo list.
 * `Lists` mantém o valor legado de `ListQueryKey.LIST` para compatibilidade de cache.
 */
export enum ListQueryKeys {
  /** Lista paginada de listas de exercícios */
  Lists = "LIST_EXERCISE",
  /** Cache individual de uma linha de lista (seed pela lista paginada) */
  ListRow = "list-row",
  /** Detalhe de uma lista com seus exercícios (por listId + classroomId) */
  List = "list-detail",
  /** Lista de exercícios de uma turma específica */
  ListOfClassroom = "list-of-classroom",
  ListsOfClassroom = "lists-of-classroom",
}
