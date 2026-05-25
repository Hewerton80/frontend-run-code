import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../userTypets";
import { removeEmptyKeys } from "@/utils/queryParams";
import { userQueryKeyFactory } from "@/modules/user/utils/userQueryKeyFactory";

export interface IGetTeachersParams {
  keyword?: string;
}

export const useFetchTeachers = (teachersParams?: IGetTeachersParams) => {
  const { apiBase } = useAxios();

  const normalizedParams = useMemo(
    () => removeEmptyKeys(teachersParams),
    [teachersParams],
  );

  const {
    data: teachers,
    isFetching: isTeachersLoading,
    error: teachersError,
    refetch: refetchTeachers,
  } = useQuery({
    queryKey: userQueryKeyFactory.teachersList(normalizedParams),
    queryFn: async ({ signal }) => {
      const res = await apiBase.get<IUser[]>("/teachers", {
        params: normalizedParams,
        signal,
      });
      return res.data ?? [];
    },
    retry: 0,
  });

  return {
    refetchTeachers,
    teachers,
    isTeachersLoading,
    teachersError,
  };
};
