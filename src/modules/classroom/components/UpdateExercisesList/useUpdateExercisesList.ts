import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useGetList } from "@/modules/list/hooks/useGetList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetExercise } from "@/modules/exercise/hooks/useGetExercise";
import { usePagination } from "@/hooks/usePagination";
import {
  IGetExercisesParams,
  useGetExercises,
} from "@/modules/exercise/hooks/useGetExercises";
import {
  IUpdateClassroomExercisesFromListFrom,
  useUdateClassroomExercisesFromListsSchema,
} from "../../schemas/updateClassroomExercisesFromLists";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { useUpdateClasrromExercisesFromList } from "../../hooks/useUpdateClasrromExercisesFromList";
import { useToast } from "@/hooks/useToast";
import { ClassroomKeys, IClassroom } from "../../classroomType";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export type UpdateExercises = IExercise & { removed?: boolean };
type ExercisesRecord = Record<string, UpdateExercises>;

export const useUpdateExercisesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const params = useParams<{ classroomId: string; listId: string }>();
  const { classroom } = useGetClassroomById(params?.classroomId);

  const {
    list,
    isLoadingExercises,
    errorExercises: errorCuerrentExercises,
    refetchExercises: refetchCurrentExercises,
  } = useGetList({
    classroomId: params?.classroomId!,
    listId: params?.listId!,
  });

  const {
    updateClasrromExercisesFromList,
    isUpdatingClasrromExercisesFromList,
  } = useUpdateClasrromExercisesFromList(params?.classroomId!, list?.id!);

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
  const { isExercisesLoading, exercisesError, exercises, refetchExercises } =
    useGetExercises(usersParams);

  const [exerciseIdToSeeInDialog, setExerciseIdToSeeInDialog] = useState<
    string | null
  >(null);

  const currentExercises = useMemo(() => list?.exercises, [list]);

  const showExerciseDetailsDialog = useMemo(
    () => !!exerciseIdToSeeInDialog,
    [exerciseIdToSeeInDialog]
  );

  const {
    exercise: exerciseDetails,
    exerciseError: exerciseErrorDetails,
    isLoadingExercise: isLoadingExerciseDetails,
    refetchExercise: refetchExerciseDetails,
  } = useGetExercise({
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
    const result = { dsad: {} } as ExercisesRecord;
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
    [exercisesToAddRecords]
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
    ]
  );

  const removeExerciseToList = useCallback(
    (uuid: string) => {
      const alreadyExists = currentExercisesRecords?.[uuid];
      const index = (exercisesToAdd || []).findIndex(
        (exercise) => exercise?.uuid === uuid
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
    ]
  );

  const unDoRemoveExerciseToList = useCallback(
    (uuid: string) => {
      const index = exercisesToAdd.findIndex(
        (exercise) => exercise?.uuid === uuid
      );
      updateExerciseState(index, {
        ...exercisesToAdd[index],
        removed: false,
      });
    },
    [exercisesToAdd, updateExerciseState]
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
      navigate(`/classroom/${classroom?.uuid}/lists`);
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
        }
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
    updateClasrromExercisesFromList(handledData, {
      onSuccess,
      onError,
    });
  }, [
    getValuesExercisesForm,
    updateClasrromExercisesFromList,
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
    isLoadingExercises,
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
    isUpdatingClasrromExercisesFromList,
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
