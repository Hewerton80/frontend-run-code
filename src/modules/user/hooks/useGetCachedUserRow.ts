import { useQuery } from "@tanstack/react-query";
import { userQueryKeyFactory } from "@/modules/user/utils/userQueryKeyFactory";
import { IUser } from "../userTypets";

export const useGetCachedUserRow = (userUuid: string) => {
  const { data: cachedUser } = useQuery({
    queryKey: userQueryKeyFactory.userRow(userUuid),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!userUuid,
  });

  return { cachedUser: cachedUser! as IUser };
};
