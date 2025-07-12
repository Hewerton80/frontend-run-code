import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IUser, UserKey } from "../userTypets";
import { removeEmptyKeys } from "@/utils/queryParams";

export interface IGetTeachersParams {
  keyword?: string;
}

export const useGetTeachers = (teachersParams?: IGetTeachersParams) => {
  const { apiBase } = useAxios();
  const {
    data: teachers,
    isFetching: isTeachersLoading,
    error: teachersError,
    refetch: refetchTeachers,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IUser[]>("/teachers", {
          params: removeEmptyKeys(teachersParams),
        })
        .then((res) => res.data || []),
    queryKey: [UserKey.List, ...Object.values(removeEmptyKeys(teachersParams))],
    enabled: true,
  });

  return {
    refetchTeachers,
    teachers,
    isTeachersLoading,
    teachersError,
  };
};
