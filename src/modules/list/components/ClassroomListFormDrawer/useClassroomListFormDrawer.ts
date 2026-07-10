import { useUpdateClassroomList } from "@/modules/classroom/hooks/useUpdateClassroomList";
import {
  ClassroomListForm,
  useClassroomListFormSchema,
} from "../../schemas/classroomListFormSchema";
import { useCallback, useEffect, useMemo } from "react";
import { DateTime } from "@/utils/dateTime";
import { toast } from "@/hooks/useToast";
import { useCreateClassroomList } from "@/modules/classroom/hooks/useCreateClassroomList";
import { handleClassroomListFormBody } from "../../utils/handleClassroomListFormBody";
import { updateCachedListOfClassroom } from "../../utils/updateCachedListOfClassroom";
import { useGetCachedListOfClassroom } from "../../hooks/useGetCachedListOfClassroom";
import { useTriggerClassroomListFormDrawer } from "./useTriggerClassroomListFormDrawer";
import { useParams } from "react-router-dom";
import { addListOfExercicesInCachedList } from "../../utils/addListOfExercicesInCachedList";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";

export const useClassroomListFormDrawer = () => {
  const params = useParams<{ classroomId: string }>();
  const {
    listIdToEdit,
    closeClassroomListFormDrawer,
    showClassroomListFormDrawer,
  } = useTriggerClassroomListFormDrawer();
  const { loggedUser } = useLoggedUser();

  const isEditing = !!listIdToEdit;

  const { cachedListOfClassroom } = useGetCachedListOfClassroom(listIdToEdit!);

  const currentListToEdit = useMemo(
    () => cachedListOfClassroom,
    [cachedListOfClassroom],
  );

  const {
    classroomListFormState,
    classroomListFormControl,
    handleClassroomListFormSubmit,
    resetClassroomListForm,
    setClassroomListFormValue,
    clearClassroomListFormErrors,
    classroomListFormRegister,
    clearClassroomListFormStates,
    watchClassroomListForm,
  } = useClassroomListFormSchema();

  const { createClassroomList, isCreatingClassroomList } =
    useCreateClassroomList();

  const { isUpdatingClassroomList, updateClassroomList } =
    useUpdateClassroomList();

  const isSubmitting = isCreatingClassroomList || isUpdatingClassroomList;

  const hasRangeDate = watchClassroomListForm("hasRangeDate");

  useEffect(() => {
    if (hasRangeDate) {
      setClassroomListFormValue("startDate", "");
      setClassroomListFormValue("endDate", "");
      clearClassroomListFormErrors(["startDate", "endDate"]);
    }
  }, [hasRangeDate, clearClassroomListFormErrors, setClassroomListFormValue]);

  useEffect(() => {
    if (!showClassroomListFormDrawer) return;
    if (currentListToEdit) {
      const startDate = currentListToEdit?.startDate;
      const endDate = currentListToEdit?.endDate;
      const hasRangeDate = !!startDate && !!endDate;
      resetClassroomListForm({
        id: currentListToEdit?.id,
        title: currentListToEdit?.title,
        classroomId: params.classroomId!,
        hasRangeDate,
        startDate: hasRangeDate ? DateTime.format(startDate, "yyyy-MM-dd") : "",
        endDate: hasRangeDate ? DateTime.format(endDate, "yyyy-MM-dd") : "",
        isVisible: currentListToEdit?.status === 2,
      });
      return;
    }
    setClassroomListFormValue("classroomId", params.classroomId!);
  }, [
    showClassroomListFormDrawer,
    currentListToEdit,
    resetClassroomListForm,
    setClassroomListFormValue,
    params.classroomId,
  ]);

  const handleClose = useCallback(() => {
    closeClassroomListFormDrawer();
    clearClassroomListFormStates();
  }, [closeClassroomListFormDrawer, clearClassroomListFormStates]);

  const handleSubmit = useCallback(
    (updateClassroomListForm: ClassroomListForm) => {
      const handledClassroomListFormBody = handleClassroomListFormBody(
        updateClassroomListForm,
      );
      const onSuccess = () => {
        toast.success(
          `Lista ${isEditing ? "atualizada" : "criada"} com sucesso!`,
        );
        handleClose();
      };
      const onError = () => {
        toast.error(`Erro ao ${isEditing ? "atualizar" : "criar"} lista`);
      };
      if (isEditing) {
        updateClassroomList(handledClassroomListFormBody, {
          onSuccess: () => {
            onSuccess();
            updateCachedListOfClassroom(
              currentListToEdit?.id!,
              handledClassroomListFormBody,
            );
          },
          onError,
        });
        return;
      }
      createClassroomList(handledClassroomListFormBody, {
        onSuccess: ({ id }) => {
          onSuccess();
          addListOfExercicesInCachedList(params.classroomId!, {
            id,
            title: handledClassroomListFormBody.title,
            classroom: { uuid: params?.classroomId! },
            solvedsMap: {},
            totalExercises: 0,
            startDate: handledClassroomListFormBody.startDate,
            endDate: handledClassroomListFormBody.endDate,
            status: handledClassroomListFormBody.status,
            author: {
              uuid: loggedUser?.uuid!,
              name: loggedUser?.name!,
              surname: loggedUser?.surname!,
              email: loggedUser?.email!,
              avatarBgColor: loggedUser?.avatarBgColor!,
              avatarFontColor: loggedUser?.avatarFontColor!,
              avatarUrl: loggedUser?.avatarUrl!,
            },
          });
        },
        onError,
      });
    },
    [
      params.classroomId,
      loggedUser,
      isEditing,
      createClassroomList,
      updateClassroomList,
      currentListToEdit?.id,
      handleClose,
    ],
  );

  return {
    classroomListFormState,
    classroomListFormControl,
    isSubmitting,
    hasRangeDate,
    isEditing,
    showClassroomListFormDrawer,
    handleClassroomListFormSubmit,
    resetClassroomListForm,
    setClassroomListFormValue,
    clearClassroomListFormErrors,
    classroomListFormRegister,
    handleClose,
    submitClassroomListForm: handleClassroomListFormSubmit(handleSubmit),
  };
};
