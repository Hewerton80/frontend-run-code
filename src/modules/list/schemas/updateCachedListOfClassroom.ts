import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IList } from "../listTypes";
import { listOfExercisesQueryKeyFactory } from "./listOfExercisesQueryKeyFactory";

export const updateCachedListOfClassroom = (
  listId: string,
  listData: Partial<IList>,
) => {
  setItemInCache<IList>(
    listOfExercisesQueryKeyFactory.ofClassroom(listId),
    (oldList) => {
      if (!oldList) return oldList;
      return {
        ...oldList,
        ...listData,
      };
    },
  );
};
