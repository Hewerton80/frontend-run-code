import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "../utils/classroomQueryKeyFactory";
import { IUser } from "@/modules/user/userTypets";

export const useGetCachedClassroomUser = (userUuid: string) => {
  const { data: cachedClassroomUser } = useQuery({
    queryKey: classroomQueryKeyFactory.row(userUuid),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!userUuid,
  });

  return { cachedClassroomUser: cachedClassroomUser! as IUser };
};
