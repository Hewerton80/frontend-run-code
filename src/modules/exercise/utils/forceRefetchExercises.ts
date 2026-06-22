import { queryClient } from "@/utils/tanstackQueryHelpers/queryClient";
import { exerciseQueryKeyFactory } from "./exerciseQueryKeyFactory";

export const forceRefetchExercises = () => {
  queryClient.invalidateQueries({
    queryKey: exerciseQueryKeyFactory.pages(),
    exact: false,
  });
};
