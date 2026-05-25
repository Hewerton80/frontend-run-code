/**
 * Enum de query keys do módulo exercise.
 * Os valores são mantidos iguais ao enum legado `ExerciseQueryKey` de `exerciseTypes.ts`
 * para garantir compatibilidade de cache com componentes que ainda usam o enum antigo.
 */
export enum ExerciseQueryKeys {
  /** Lista paginada de exercícios */
  Exercises = "exercises",
  /** Detalhe de um exercício por ID */
  Exercise = "exercise",
  /** Exercícios de uma lista de uma turma */
  ExercisesByClassroom = "exercisesByClassroom",
  /** Exercício individual dentro de uma lista */
  ExerciseOfList = "exerciseList",
}
