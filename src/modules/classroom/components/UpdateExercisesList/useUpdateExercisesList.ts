import { useFetchListOfExercises } from "@/modules/list/hooks/useFetchListOfExercises";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchExercise } from "@/modules/exercise/hooks/useFetchExercise";
import { usePagination } from "@/hooks/usePagination";
import {
  IFetchExercisesParams as IGetExercisesParams,
  useFetchExercises,
} from "@/modules/exercise/hooks/useFetchExercises";
import { useUdateClassroomExercisesFromListsSchema } from "../../schemas/updateClassroomExercisesFromLists";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { useUpdateClassroomExercisesFromList } from "../../hooks/useUpdateClassroomExercisesFromList";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useGetCachedClassrom } from "../../hooks/useGetCachedClassrom";
import { updateCachedListOfClassroom } from "@/modules/list/utils/updateCachedListOfClassroom";
import { PaginationBarProps } from "@/components/ui/navigation/PaginationBar";
import { forceRefetchExercisesOfList } from "@/modules/list/utils/forceRefetchExercisesOfList";
import { toast } from "@/hooks/useToast";

export type UpdateExercises = IExercise & { removed?: boolean };
type ExercisesRecord = Record<string, UpdateExercises>;

export type UpdateExercisesListSelectedItem = {
  uuid: string;
  removed?: boolean;
};

export const useUpdateExercisesList = () => {
  const navigate = useNavigate();

  const params = useParams<{ classroomId: string; listId: string }>();
  const { cachedClassroom: classroom } = useGetCachedClassrom(
    params?.classroomId!,
  );

  const {
    list,
    isFetchingExercises,
    errorExercises: errorCuerrentExercises,
    refetchListOfExercises: refetchCurrentExercises,
  } = useFetchListOfExercises({
    classroomId: params?.classroomId!,
    listId: parseInt(params?.listId!),
  });

  console.log("list", list);

  const {
    updateClassroomExercisesFromList,
    isUpdatingClassroomExercisesFromList,
  } = useUpdateClassroomExercisesFromList(params?.classroomId!, list?.id!);

  const {
    exercisesToAdd,
    formStateExercisesForm,
    updateExerciseState,
    appendExercise,
    removeExercise,
    resetExercisesForm,
    getValuesExercisesForm,
  } = useUdateClassroomExercisesFromListsSchema();

  const { goToPage, paginationParams } = usePagination();
  const usersParams: IGetExercisesParams = {
    ...paginationParams,
  };
  const {
    isFetchingExercises: isExercisesLoading,
    exercisesError,
    exercisesRecords,
    refetchExercises,
  } = useFetchExercises(usersParams);

  const [exerciseIdToSeeInDialog, setExerciseIdToSeeInDialog] = useState<
    string | null
  >(null);

  const currentExercises = useMemo(() => list?.exercises, [list]);

  const showExerciseDetailsDialog = useMemo(
    () => !!exerciseIdToSeeInDialog,
    [exerciseIdToSeeInDialog],
  );

  const {
    exercise: exerciseDetails,
    exerciseError: exerciseErrorDetails,
    isFetchingExercise: isLoadingExerciseDetails,
    refetchExercise: refetchExerciseDetails,
  } = useFetchExercise({
    exerciseId: exerciseIdToSeeInDialog || "",
    listId: params?.listId,
    classroomId: params?.classroomId,
  });

  const exercisesMap = useMemo<ExercisesRecord>(() => {
    const result = {} as ExercisesRecord;
    exercisesRecords?.data?.forEach((exercise) => {
      result[exercise?.uuid!] = exercise;
    });
    return result;
  }, [exercisesRecords]);

  const currentExercisesRecords = useMemo<ExercisesRecord>(() => {
    const result = {} as ExercisesRecord;
    currentExercises?.forEach((exercise) => {
      result[exercise?.uuid!] = exercise;
    });
    return result;
  }, [currentExercises]);

  const exercisesToAddRecords = useMemo<ExercisesRecord>(() => {
    const result = {} as ExercisesRecord;
    exercisesToAdd?.forEach((exercise) => {
      if (exercise?.uuid) {
        // TODO verificar se o type de exerciseToAdd é compatível com IExercise, caso contrário, pode causar problemas de tipagem.
        result[exercise?.uuid!] = exercise as any;
      }
    });
    return result;
  }, [exercisesToAdd]);

  /** UUIDs da tabela esquerda (exercícios disponíveis paginados) */
  const exerciseUuids = useMemo(
    () => exercisesRecords?.data?.map((e) => e.uuid ?? "") ?? [],
    [exercisesRecords],
  );

  /** Items mínimos da tabela direita (exercícios selecionados com estado removed) */
  const exercisesToAddItems = useMemo<UpdateExercisesListSelectedItem[]>(
    () =>
      exercisesToAdd?.map((e) => ({
        uuid: e.uuid!,
        removed: e.removed,
      })) ?? [],
    [exercisesToAdd],
  );

  /** Paginação da tabela esquerda */
  const pagination = useMemo<PaginationBarProps | null>(() => {
    if (!exercisesRecords) return null;
    return {
      currentPage: exercisesRecords.currentPage ?? 1,
      totalPages: exercisesRecords.lastPage ?? 1,
      perPage: exercisesRecords.perPage ?? 25,
      totalRecords: exercisesRecords.total ?? 0,
      onChangePage: goToPage,
    };
  }, [exercisesRecords, goToPage]);

  const verifyIfExerciseAlreadyExistsInCurrentList = useCallback(
    (uuid: string) => {
      const alreadyExists = exercisesToAddRecords?.[uuid];
      return alreadyExists;
    },
    [exercisesToAddRecords],
  );

  const addExerciseToList = useCallback(
    (uuid: string) => {
      const alreadyExists = verifyIfExerciseAlreadyExistsInCurrentList(uuid);
      if (alreadyExists) return;
      const exerciseToAdd = { ...(exercisesMap?.[uuid] || {}) };
      appendExercise({
        ...exerciseToAdd,
        removed: false,
      });
    },
    [exercisesMap, verifyIfExerciseAlreadyExistsInCurrentList, appendExercise],
  );

  const removeExerciseToList = useCallback(
    (uuid: string) => {
      const alreadyExists = currentExercisesRecords?.[uuid];
      const index = (exercisesToAdd || []).findIndex(
        (exercise) => exercise?.uuid === uuid,
      );
      if (alreadyExists) {
        updateExerciseState(index, {
          ...alreadyExists,
          removed: true,
        });
        return;
      }
      removeExercise(index);
    },
    [
      exercisesToAdd,
      currentExercisesRecords,
      removeExercise,
      updateExerciseState,
    ],
  );

  const unDoRemoveExerciseToList = useCallback(
    (uuid: string) => {
      const index = exercisesToAdd.findIndex(
        (exercise) => exercise?.uuid === uuid,
      );
      updateExerciseState(index, {
        ...exercisesToAdd[index],
        removed: false,
      });
    },
    [exercisesToAdd, updateExerciseState],
  );

  const handleResetExercisesForm = useCallback(() => {
    if (currentExercises) {
      resetExercisesForm({
        exercises: currentExercises?.map((exercise) => ({
          ...exercise,
          removed: false,
        })),
      });
    } else {
      resetExercisesForm({
        exercises: [],
      });
    }
  }, [resetExercisesForm, currentExercises]);

  useEffect(() => {
    handleResetExercisesForm();
  }, [handleResetExercisesForm]);

  useEffect(() => {
    if (exerciseIdToSeeInDialog) {
      refetchExerciseDetails();
    }
  }, [exerciseIdToSeeInDialog, refetchExerciseDetails]);

  useEffect(() => {
    refetchCurrentExercises();
  }, [refetchCurrentExercises]);

  const openExerciseDetailsDialog = useCallback((exerciseId: string) => {
    setExerciseIdToSeeInDialog(exerciseId);
  }, []);

  const closeExerciseDetailsDialog = useCallback(() => {
    setExerciseIdToSeeInDialog(null);
  }, []);

  const handleUpdateClasrromExercisesFromList = useCallback(() => {
    if (!formStateExercisesForm.isDirty) return;

    const data = getValuesExercisesForm();

    const handledData =
      data?.exercises
        ?.filter((exercise) => !exercise?.removed)
        .map((exercise) => ({
          id: exercise?.id!,
        })) || [];

    const onSuccess = () => {
      navigate(ROUTES.CLASSROOM_LISTS(classroom?.uuid!));
      toast.success("Exercícios atualizados com sucesso!");
      updateCachedListOfClassroom(list?.id!, (prevData) => {
        if (!prevData) return prevData;
        return { ...prevData, totalExercises: handledData?.length };
      });
      forceRefetchExercisesOfList(list?.id!);
    };
    const onError = () => {
      toast.error("Erro ao atualizar exercícios");
    };
    updateClassroomExercisesFromList(handledData, {
      onSuccess,
      onError,
    });
  }, [
    getValuesExercisesForm,
    updateClassroomExercisesFromList,
    formStateExercisesForm.isDirty,
    navigate,
    classroom,
    list,
  ]);

  return {
    classroom,
    list,
    isFetchingExercises,
    errorCuerrentExercises,
    showExerciseDetailsDialog,
    exerciseDetails,
    exerciseErrorDetails,
    isLoadingExerciseDetails,
    isExercisesLoading,
    exercisesError,
    exerciseUuids,
    exercisesToAddItems,
    pagination,
    isDirtyExercisesForm: formStateExercisesForm.isDirty,
    isUpdatingClassroomExercisesFromList,
    currentExercises,
    handleResetExercisesForm,
    handleUpdateClasrromExercisesFromList,
    unDoRemoveExerciseToList,
    removeExerciseToList,
    verifyIfExerciseAlreadyExistsInCurrentList,
    addExerciseToList,
    refetchExercises,
    openExerciseDetailsDialog,
    closeExerciseDetailsDialog,
    refetchExerciseDetails,
    refetchCurrentExercises,
  };
};
