import { useParams } from "next/navigation";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useGetExercisesByClassroomList } from "@/modules/exercise/hooks/useGetExercisesByClassroomList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetExercise } from "@/modules/exercise/hooks/useGetExercise";
import { usePagination } from "@/hooks/usePagination";
import {
  IGetExercisesParams,
  useGetExercises,
} from "@/modules/exercise/hooks/useGetExercises";
import {
  IUpdateClassroomExercisesFromLists,
  useUdateClassroomExercisesFromListsSchema,
} from "../../schemas/updateClassroomExercisesFromLists";
import { IExercise } from "@/modules/exercise/exerciseTypes";

export type UpdateExercises = IExercise & { removed?: boolean };
type ExercisesRecord = Record<string, UpdateExercises>;

export const useUpdateClassroomExercisesFromLists = () => {
  const params = useParams<{ classroomId: string; listId: string }>();
  const { classroom } = useGetClassroomById(params?.classroomId);

  const {
    list,
    exercises: currentExercises,
    isLoadingExercises,
    errorExercises: errorCuerrentExercises,
    refetchExercises: refetchCurrentExercises,
  } = useGetExercisesByClassroomList({
    classroomId: params?.classroomId,
    listId: params?.listId,
  });

  const {
    exercisesToAdd,
    updateExerciseState,
    appendExercise,
    removeExercise,
    resetExercisesForm,
    isDirtyExercisesForm,
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

  useEffect(() => {
    if (currentExercises) {
      resetExercisesForm({
        exercises: currentExercises?.map((exercise) => ({
          ...exercise,
          removed: false,
        })),
      });
    }
  }, [currentExercises, resetExercisesForm]);

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
    isDirtyExercisesForm,
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
