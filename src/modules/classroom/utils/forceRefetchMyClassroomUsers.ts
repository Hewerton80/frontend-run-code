import { queryClient } from "@/utils/tanstackQueryHelpers/queryClient";
import { classroomQueryKeyFactory } from "./classroomQueryKeyFactory";

export const forceRefetchMyClassroomUsers = (classroomUuid: string) => {
  //TODO dar um jeito de refetch pegar mesmo nao passando o params de segundo arguemnto, e quero resetar a paginação para a primeira pagina quando for refetchar,
  queryClient.invalidateQueries({
    queryKey: classroomQueryKeyFactory.users(classroomUuid),
    exact: false,
  });
};
