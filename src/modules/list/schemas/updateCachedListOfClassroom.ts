import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IList } from "../listTypes";
import { listOfExercisesQueryKeyFactory } from "../utils/listOfExercisesQueryKeyFactory";

export const updateCachedListOfClassroom = (
  listId: number,
  listData: Partial<IList>,
) => {
  setItemInCache<IList>(
    listOfExercisesQueryKeyFactory.oneOfClassroom(listId),
    (oldList) => {
      if (!oldList) return oldList;
      return {
        ...oldList,
        ...listData,
      };
    },
  );
};
