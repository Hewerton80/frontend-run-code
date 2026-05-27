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
import { useToast } from "@/hooks/useToast";
import { ClassroomKeys, IClassroom } from "../../classroomType";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useGetCachedClassrom } from "../../hooks/useGetCachedClassrom";

export type UpdateExercises = IExercise & { removed?: boolean };
type ExercisesRecord = Record<string, UpdateExercises>;

export const useUpdateExercisesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const params = useParams<{ classroomId: string; listId: string }>();
  const { cachedClassroom: classroom } = useGetCachedClassrom(
    params?.classroomId!,
  );

  const {
    list,
    isFetchingExercises,
    errorExercises: errorCuerrentExercises,
    refetchExercises: refetchCurrentExercises,
  } = useFetchListOfExercises({
    classroomId: params?.classroomId!,
    listId: parseInt(params?.listId!),
  });

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
    exercisesRecords: exercises,
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

  const exercisesRecords = useMemo<ExercisesRecord>(() => {
    const result = {} as ExercisesRecord;
    exercises?.data?.forEach((exercise) => {
      result[exercise?.uuid!] = exercise;
    });
    return result;
  }, [exercises]);

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
      result[exercise?.uuid!] = exercise as UpdateExercises;
    });
    return result;
  }, [exercisesToAdd]);

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
      const exerciseToAdd = { ...(exercisesRecords?.[uuid] || {}) };
      appendExercise({
        ...exerciseToAdd,
        removed: false,
      });
    },
    [
      exercisesRecords,
      verifyIfExerciseAlreadyExistsInCurrentList,
      appendExercise,
    ],
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
      queryClient.setQueryData(
        [ClassroomKeys.Details, classroom?.uuid],
        (classroom: IClassroom) => {
          const lists = classroom?.lists?.map((classroomList) => ({
            ...classroomList,
            totalExercises:
              list?.id === classroomList?.id
                ? handledData?.length
                : classroomList?.totalExercises,
          }));
          classroom.lists = lists;
          return classroom;
        },
      );
      toast({
        title: "Exercícios atualizados com sucesso!",
        variant: "success",
      });
    };
    const onError = () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar exercícios",
        variant: "danger",
        direction: "bottom-right",
      });
    };
    updateClassroomExercisesFromList(handledData, {
      onSuccess,
      onError,
    });
  }, [
    getValuesExercisesForm,
    updateClassroomExercisesFromList,
    toast,
    formStateExercisesForm.isDirty,
    navigate,
    queryClient,
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
    exercises,
    exercisesToAdd,
    isDirtyExercisesForm: formStateExercisesForm.isDirty,
    isUpdatingClassroomExercisesFromList,
    currentExercises,
    handleResetExercisesForm,
    handleUpdateClasrromExercisesFromList,
    unDoRemoveExerciseToList,
    removeExerciseToList,
    verifyIfExerciseAlreadyExistsInCurrentList,
    addExerciseToList,
    goToPage,
    refetchExercises,
    openExerciseDetailsDialog,
    closeExerciseDetailsDialog,
    refetchExerciseDetails,
    refetchCurrentExercises,
  };
};
