import { ClassroomKeys } from "@/modules/classroom/classroomType";
import {
  IGetListExercisesParams,
  useFetchLists,
} from "../../hooks/useFetchLists";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { IList } from "../../listTypes";
import { useMemo, useState } from "react";
import { useFetchClassroomById } from "@/modules/classroom/hooks/useFetchClassroomById";

import { useUpdateClassroomLists as useUpdateClassroomListsMutation } from "@/modules/classroom/hooks/useUpdateClassroomLists";
import { useToast } from "@/hooks/useToast";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";

export interface IUpdateClassroomList extends IList {
  removed?: boolean;
  isVisible?: boolean;
}

type ListRecord = Record<string, IUpdateClassroomList>;

export const useUpdateClassroomLists = () => {
  const { toast } = useToast();

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { classroom, isFetchingClassroom: isLoadingClassroom } =
    useFetchClassroomById(params.get("classroomId") as string);

  const queryClient = useQueryClient();

  const { goToPage, paginationParams } = usePagination();

  const listsParams: IGetListExercisesParams = {
    ...paginationParams,
    // notIn: classroom?.lists?.map((list) => list.uuid).join(","),
  };

  const {
    refetchListExercises,
    listExercises,
    isListExercisesLoading,
    listExercisesError,
  } = useFetchLists(listsParams);

  const { updateClassroomLists, isUpdatingClassroomLists } =
    useUpdateClassroomListsMutation();

  const [classroomListsToAddRecords, setClassroomListsToAddRecords] =
    useState<ListRecord>(() => {
      const result = {} as ListRecord;
      classroom?.lists?.forEach((list) => {
        result[list?.uuid!] = {
          ...list,
          removed: false,
          isVisible: list?.status === 2,
        };
      });
      return result;
    });

  const classroomListsToAdd = useMemo<IUpdateClassroomList[]>(() => {
    return Object.values(classroomListsToAddRecords);
  }, [classroomListsToAddRecords]);

  const currentClassroomListsToAddRecords = useMemo<ListRecord>(() => {
    const result = {} as ListRecord;
    classroom?.lists?.forEach((list) => {
      result[list?.uuid!] = list;
    });
    return result;
  }, [classroom]);

  const ListsRecords = useMemo<ListRecord>(() => {
    const result = {} as ListRecord;
    listExercises?.data?.forEach((list) => {
      result[list?.uuid!] = list;
    });
    return result;
  }, [listExercises]);

  const addListToClassroom = (uuid: string) => {
    const list = { ...ListsRecords?.[uuid] };
    setClassroomListsToAddRecords((prev) => {
      list.removed = false;
      list.isVisible = false;
      const newList = { ...prev, [list?.uuid!]: list };
      return newList;
    });
  };

  const removeListToClassroom = (uuid: string) => {
    setClassroomListsToAddRecords((prev) => {
      const alreadyAddedInCurrentClassroom =
        currentClassroomListsToAddRecords?.[uuid];

      if (alreadyAddedInCurrentClassroom) {
        const foundList = prev[uuid];
        return { ...prev, [uuid]: { ...foundList, removed: true } };
      }
      const newList = { ...prev };
      delete newList[uuid];
      return newList;
    });
  };

  const unDoRemoveListToClassroom = (uuid: string) => {
    setClassroomListsToAddRecords((prev) => {
      const foundList = prev[uuid];
      if (foundList) {
        foundList.removed = false;
      }
      return { ...prev };
    });
  };

  const handleUpdateClassroomLists = () => {
    updateClassroomLists(
      {
        classroomId: classroom?.uuid!,
        lists: Object.values(classroomListsToAddRecords)
          .filter((list) => !list?.removed)
          .map((list) => ({
            id: list?.id!,
            status: list?.isVisible ? 2 : 1,
            startDate: list?.startDate || null,
            endDate: list?.endDate || null,
          })),
      },
      {
        onSuccess: () => {
          navigate(`/classroom/${classroom?.uuid}/lists`);
          queryClient.resetQueries({
            queryKey: [ClassroomKeys.Details, classroom?.uuid],
          });
          toast({
            title: "Listas atualizadas com sucesso!",
            variant: "success",
          });
        },
        onError: () => {
          toast({
            title: "Erro",
            description: "Erro ao atualizar listas",
            variant: "danger",
          });
        },
      },
    );
  };

  const checkVisibility = (uuid: string, isVisible: boolean) => {
    setClassroomListsToAddRecords(({ ...prev }) => {
      const foundList = prev[uuid];
      if (foundList) {
        foundList.isVisible = isVisible;
      }
      return prev;
    });
  };

  return {
    isListExercisesLoading,
    listExercises,
    listExercisesError,
    classroom,
    classroomListsToAddRecords,
    isLoadingClassroom,
    classroomListsToAdd,
    isUpdatingClassroomLists,
    updateClassroomLists: handleUpdateClassroomLists,
    checkVisibility,
    unDoRemoveListToClassroom,
    addListToClassroom,
    removeListToClassroom,
    goToPage,
    refetchListExercises,
  };
};
