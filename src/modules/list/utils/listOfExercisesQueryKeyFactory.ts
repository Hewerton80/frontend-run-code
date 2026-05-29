import { ListQueryKeys } from "@/modules/list/types/ListQueryKeys";

export const listOfExercisesQueryKeyFactory = {
  all: () => [ListQueryKeys.Lists] as const,

  pages: (params?: object) =>
    [...listOfExercisesQueryKeyFactory.all(), params] as const,

  oneOfClassroom: (listId: number) =>
    [ListQueryKeys.ListOfClassroom, listId] as const,
  allOfClassroom: (classroomUuid: string) =>
    [ListQueryKeys.ListsOfClassroom, classroomUuid] as const,
  withExercises: (listId: number) => [ListQueryKeys.List, listId] as const,
};
