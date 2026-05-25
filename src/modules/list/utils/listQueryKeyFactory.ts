import { ListQueryKeys } from "@/modules/list/types/ListQueryKeys";

/**
 * Factory de query keys do módulo list.
 * Use sempre esta factory em vez de arrays inline para garantir
 * consistência, autocomplete e invalidação segura.
 *
 * Hierarquia:
 *   all → list(params)
 *   detail(listId, classroomId)
 *
 * @see listOfExercisesQueryKeyFactory — factory para exercícios dentro de uma lista
 */
export const listQueryKeyFactory = {
  /** Raiz de todas as queries de lista paginada */
  all: () => [ListQueryKeys.Lists] as const,

  /** Lista paginada de listas com params normalizados */
  list: (params?: object) => [...listQueryKeyFactory.all(), params] as const,

  /** Detalhe de uma lista com seus exercícios (por listId + classroomId) */
  detail: (listId: string, classroomId: string) =>
    [ListQueryKeys.List, listId, classroomId] as const,
};
