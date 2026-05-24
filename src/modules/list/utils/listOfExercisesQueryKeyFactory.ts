import { ExerciseQueryKey } from "@/modules/exercise/exerciseTypes";

export const listOfExercisesQueryKeyFactory = {
  list: (listId: string, classroomId: string) =>
    [ExerciseQueryKey.EXERCISES_BY_CLASSROOM, listId, classroomId] as const,
  exerciseOfList: (exerciseId: string, listId: string) =>
    [ExerciseQueryKey.EXERCISE_OF_LIST, exerciseId, listId] as const,
};
