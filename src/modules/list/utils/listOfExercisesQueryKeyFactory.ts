import { ListQueryKeys } from "@/modules/list/types/ListQueryKeys";

export const listOfExercisesQueryKeyFactory = {
  all: () => [ListQueryKeys.Lists] as const,

  pages: (params?: object) =>
    [...listOfExercisesQueryKeyFactory.all(), params] as const,

  /** Cache individual de uma linha de lista (seed pela lista paginada) */
  listRow: (listId?: number | null) => [ListQueryKeys.ListRow, listId] as const,

  oneOfClassroom: (listId: number) =>
    [ListQueryKeys.ListOfClassroom, listId] as const,
  allOfClassroom: (classroomUuid: string) =>
    [ListQueryKeys.ListsOfClassroom, classroomUuid] as const,
  withExercises: (listId: number) => [ListQueryKeys.List, listId] as const,
};
