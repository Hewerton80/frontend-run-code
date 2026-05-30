import { queryClient } from "@/utils/tanstackQueryHelpers/queryClient";
import { classroomQueryKeyFactory } from "./classroomQueryKeyFactory";

export const forceRefetchMyClassrooms = () => {
  queryClient.invalidateQueries({
    queryKey: classroomQueryKeyFactory.myClassrooms(),
    exact: false,
  });
};
