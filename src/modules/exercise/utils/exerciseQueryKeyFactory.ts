import { ExerciseQueryKeys } from "@/modules/exercise/types/ExerciseQueryKeys";

/**
 * Factory de query keys do módulo exercise.
 * Use sempre esta factory em vez de arrays inline para garantir
 * consistência, autocomplete e invalidação segura.
 *
 * Hierarquia:
 *   all → list(params)
 *   detail(exerciseId, classroomId?, listId?)
 *   byClassroom(listId, classroomId)
 *   ofList(exerciseId, listId)
 */
export const exerciseQueryKeyFactory = {
  /** Raiz de todas as queries de lista paginada de exercícios */
  all: () => [ExerciseQueryKeys.Exercises] as const,

  /** Lista paginada de exercícios com params normalizados */
  list: (params?: object) =>
    [...exerciseQueryKeyFactory.all(), params] as const,

  /** Detalhe de um exercício (com contexto opcional de turma/lista) */
  detail: (exerciseId: string, classroomId?: string, listId?: string) =>
    [ExerciseQueryKeys.Exercise, exerciseId, classroomId, listId] as const,

  /** Exercícios de uma lista dentro de uma turma (semeados por useFetchList) */
  byClassroom: (listId: string, classroomId: string) =>
    [ExerciseQueryKeys.ExercisesByClassroom, listId, classroomId] as const,

  /** Exercício individual dentro de uma lista (lido por useGetCachedExerciseOfList) */
  ofList: (exerciseId: string, listId: string) =>
    [ExerciseQueryKeys.ExerciseOfList, exerciseId, listId] as const,
};
