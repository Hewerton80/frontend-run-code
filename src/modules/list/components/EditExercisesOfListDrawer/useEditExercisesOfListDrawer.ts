import { useFetchListOfExercises } from "@/modules/list/hooks/useFetchListOfExercises";
import { useCallback, useEffect, useMemo } from "react";
import { usePagination } from "@/hooks/usePagination";
import {
  IFetchExercisesParams,
  useFetchExercises,
} from "@/modules/exercise/hooks/useFetchExercises";
import { useUdateClassroomExercisesFromListsSchema } from "@/modules/classroom/schemas/updateClassroomExercisesFromLists";
import { useUpdateClassroomExercisesFromList } from "@/modules/classroom/hooks/useUpdateClassroomExercisesFromList";
import { updateCachedListOfClassroom } from "@/modules/list/utils/updateCachedListOfClassroom";
import { forceRefetchExercisesOfList } from "@/modules/list/utils/forceRefetchExercisesOfList";
import { PaginationBarProps } from "@/components/ui/navigation/PaginationBar";
import { useTriggerEditExercisesOfListDrawer } from "./useTriggerEditExercisesOfListDrawer";
import { toast } from "@/hooks/useToast";

export const useEditExercisesOfListDrawer = () => {
  const { listId, classroomId, showDrawer, closeDrawer } =
    useTriggerEditExercisesOfListDrawer();

  const {
    list,
    isFetchingExercises: isFetchingCurrentExercises,
    refetchListOfExercises: refetchCurrentExercises,
  } = useFetchListOfExercises({
    classroomId: classroomId ?? "",
    listId: listId ?? 0,
  });

  const {
    updateClassroomExercisesFromList,
    isUpdatingClassroomExercisesFromList,
  } = useUpdateClassroomExercisesFromList(classroomId ?? "", listId ?? 0);

  const {
    exercisesToAdd,
    formStateExercisesForm,
    appendExercise,
    removeExercise,
    resetExercisesForm,
    getValuesExercisesForm,
  } = useUdateClassroomExercisesFromListsSchema();

  const { goToPage, paginationParams } = usePagination();

  const exercisesParams: IFetchExercisesParams = {
    ...paginationParams,
  };

  const {
    isFetchingExercises: isExercisesLoading,
    exercisesError,
    exercisesRecords,
    refetchExercises,
  } = useFetchExercises(exercisesParams, { enabled: showDrawer });

  const currentExercises = useMemo(() => list?.exercises, [list]);

  /** UUIDs da lista paginada de todos os exercícios disponíveis */
  const exerciseUuids = useMemo(
    () => exercisesRecords?.data?.map((e) => e.uuid ?? "") ?? [],
    [exercisesRecords],
  );

  /** Paginação da tabela de exercícios disponíveis */
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

  /** Mapa de exercícios já adicionados à lista (por UUID) */
  const exercisesToAddMap = useMemo(() => {
    const result: Record<string, boolean> = {};
    exercisesToAdd?.forEach((exercise) => {
      if (exercise?.uuid) {
        result[exercise.uuid] = true;
      }
    });
    return result;
  }, [exercisesToAdd]);

  const verifyIfExerciseIsInList = useCallback(
    (uuid: string) => !!exercisesToAddMap[uuid],
    [exercisesToAddMap],
  );

  const addExerciseToList = useCallback(
    (uuid: string) => {
      if (verifyIfExerciseIsInList(uuid)) return;
      const exerciseData = exercisesRecords?.data?.find((e) => e.uuid === uuid);
      if (!exerciseData) return;
      appendExercise({ ...exerciseData, removed: false });
    },
    [exercisesRecords, verifyIfExerciseIsInList, appendExercise],
  );

  const removeExerciseToList = useCallback(
    (uuid: string) => {
      const index = exercisesToAdd.findIndex((e) => e?.uuid === uuid);
      if (index === -1) return;
      removeExercise(index);
    },
    [exercisesToAdd, removeExercise],
  );

  const handleResetExercisesForm = useCallback(() => {
    resetExercisesForm({
      exercises: (currentExercises ?? []).map((exercise) => ({
        ...exercise,
        removed: false,
      })),
    });
  }, [resetExercisesForm, currentExercises]);

  /** Inicializa o form quando os exercícios da lista são carregados */
  useEffect(() => {
    if (currentExercises !== undefined) {
      handleResetExercisesForm();
    }
  }, [handleResetExercisesForm, currentExercises]);

  /** Reseta o form ao fechar o drawer */
  useEffect(() => {
    if (!showDrawer) {
      resetExercisesForm({ exercises: [] });
    }
  }, [showDrawer, resetExercisesForm]);

  const handleSave = useCallback(() => {
    if (!formStateExercisesForm.isDirty) return;

    const data = getValuesExercisesForm();
    const handledData =
      data?.exercises
        ?.filter((exercise) => !exercise?.removed)
        .map((exercise) => ({ id: exercise?.id! })) ?? [];

    const onSuccess = () => {
      toast.success("Exercícios atualizados com sucesso!");
      // TODO seja o proefessor e ele marque que nao é visivel para os alunos, deve se manter visivel para ele

      updateCachedListOfClassroom(listId!, (prevData) => {
        if (!prevData) return prevData;
        return { ...prevData, totalExercises: handledData.length };
      });
      forceRefetchExercisesOfList(listId!);
      closeDrawer();
    };

    const onError = () => {
      toast.error("Erro ao atualizar exercícios");
    };

    updateClassroomExercisesFromList(handledData, { onSuccess, onError });
  }, [
    formStateExercisesForm.isDirty,
    getValuesExercisesForm,
    updateClassroomExercisesFromList,
    listId,
    closeDrawer,
  ]);

  const handleClose = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  return {
    showDrawer,
    exerciseUuids,
    pagination,
    isExercisesLoading,
    exercisesError,
    isFetchingCurrentExercises,
    isDirty: formStateExercisesForm.isDirty,
    isUpdating: isUpdatingClassroomExercisesFromList,
    verifyIfExerciseIsInList,
    addExerciseToList,
    removeExerciseToList,
    refetchExercises,
    refetchCurrentExercises,
    handleSave,
    handleClose,
  };
};
