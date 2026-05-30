import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IFetchListsByClassromUuidResponse } from "../hooks/useFetchListsByClassromUuid";
import { listOfExercisesQueryKeyFactory } from "./listOfExercisesQueryKeyFactory";

export const addListOfExercicesInCachedList = (
  classroomUuid: string,
  data: IFetchListsByClassromUuidResponse,
) => {
  setItemInCache<IFetchListsByClassromUuidResponse[]>(
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
