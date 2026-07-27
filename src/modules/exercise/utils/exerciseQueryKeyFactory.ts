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
  pages: (params?: object) =>
    [...exerciseQueryKeyFactory.all(), ...(params ? [params] : [])] as const,

  /** Detalhe de um exercício (com contexto opcional de turma/lista) */
  detail: (exerciseUuId: string, classroomUUId?: string, listId?: string) =>
    [ExerciseQueryKeys.Exercise, exerciseUuId, classroomUUId, listId] as const,
  row: (exerciseUuId: string) => [ExerciseQueryKeys.Row, exerciseUuId] as const,
  /** Exercícios de uma lista dentro de uma turma (semeados por useFetchList) */
  byClassroom: (listId: string, classroomUUId: string) =>
    [ExerciseQueryKeys.ExercisesByClassroom, listId, classroomUUId] as const,

  /** Exercício individual dentro de uma lista (lido por useGetCachedExerciseOfList) */
  ofList: (exerciseUuId: string, listId: number) =>
    [ExerciseQueryKeys.ExerciseOfList, exerciseUuId, listId] as const,
};
