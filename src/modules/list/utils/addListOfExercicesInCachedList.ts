import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IFetchListsOfClassromResponse } from "../hooks/useFetchListsByClassromUuid";
import { listOfExercisesQueryKeyFactory } from "./listOfExercisesQueryKeyFactory";

export const addListOfExercicesInCachedList = (
  classroomUuid: string,
  data: IFetchListsOfClassromResponse,
) => {
  setItemInCache<IFetchListsOfClassromResponse[]>(
    listOfExercisesQueryKeyFactory.allOfClassroom(classroomUuid),
    (oldData) => {
      if (!oldData) return oldData;
      setItemInCache(
        listOfExercisesQueryKeyFactory.oneOfClassroom(data.id),
        data,
      );
      return [...oldData, data];
    },
  );
};
