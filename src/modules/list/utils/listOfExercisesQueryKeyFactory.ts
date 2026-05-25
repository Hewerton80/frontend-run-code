import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";

/**
 * Factory de query keys para exercícios dentro de uma lista.
 * Delega para `exerciseQueryKeyFactory` para garantir consistência de chaves.
 *
 * Usado em:
 * - `useFetchList` (semeador via `setItemInCache`)
 * - `useGetCachedExerciseOfList` (leitor de cache)
 */
export const listOfExercisesQueryKeyFactory = {
  /** Chave da lista completa de exercícios de uma turma/lista */
  list: (listId: string, classroomId: string) =>
    exerciseQueryKeyFactory.byClassroom(listId, classroomId),

  /** Chave de um exercício individual dentro de uma lista */
  exerciseOfList: (exerciseId: string, listId: string) =>
    exerciseQueryKeyFactory.ofList(exerciseId, listId),
};
