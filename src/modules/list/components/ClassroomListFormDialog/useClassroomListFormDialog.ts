import { useUpdateClassroomList } from "@/modules/classroom/hooks/useUpdateClassroomList";
import {
  ClassroomListForm,
  useClassroomListFormSchema,
} from "../../schemas/classroomListFormSchema";
import { IList } from "../../listTypes";
import { useCallback, useEffect, useMemo } from "react";
import { DateTime } from "@/utils/dateTime";
import { useToast } from "@/hooks/useToast";
import { useCreateClassroomList } from "@/modules/classroom/hooks/useCreateClassroomList";
import { handleClassroomListFormBody } from "../../utils/handleClassroomListFormBody";
import { updateCachedListOfClassroom } from "../../utils/updateCachedListOfClassroom";
import { useGetCachedListOfClassroom } from "../../hooks/useGetCachedListOfClassroom";
import { useTriggerClassroomListFormDialog } from "./useTriggerClassroomListFormDialog";

export const useClassroomListFormDialog = () => {
  const {
    listIdToEdit,
    closeClassroomListFormDialog,
    showClassroomListFormDialog,
  } = useTriggerClassroomListFormDialog();

  const isEditing = !!listIdToEdit;

  const { cachedListOfClassroom } = useGetCachedListOfClassroom(listIdToEdit!);
  const currentListToEdit = useMemo(
    () => cachedListOfClassroom as IList | undefined,
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

  const { toast } = useToast();

  const { createClassroomList, isCreatingClassroomList } =
    useCreateClassroomList();

  const { isUpdatingClassroomList, updateClassroomList } =
    useUpdateClassroomList();

  const isSubmitting = isCreatingClassroomList || isUpdatingClassroomList;

  const { hasRangeDate } = watchClassroomListForm();

  useEffect(() => {
    if (hasRangeDate) {
      setClassroomListFormValue("startDate", "");
      setClassroomListFormValue("endDate", "");
      clearClassroomListFormErrors(["startDate", "endDate"]);
    }
  }, [hasRangeDate, clearClassroomListFormErrors, setClassroomListFormValue]);

  useEffect(() => {
    if (currentListToEdit) {
      const startDate = currentListToEdit?.startDate;
      const endDate = currentListToEdit?.endDate;
      const hasRangeDate = !!startDate && !!endDate;
      resetClassroomListForm({
        id: currentListToEdit?.id,
        title: currentListToEdit?.title,
        classroomId: currentListToEdit?.classroom?.uuid as string,
        hasRangeDate,
        startDate: hasRangeDate ? DateTime.format(startDate, "yyyy-MM-dd") : "",
        endDate: hasRangeDate ? DateTime.format(endDate, "yyyy-MM-dd") : "",
        isVisible: currentListToEdit?.status === 2,
      });
    }
  }, [currentListToEdit, resetClassroomListForm]);

  const handleClose = useCallback(() => {
    closeClassroomListFormDialog();
    clearClassroomListFormStates();
  }, [closeClassroomListFormDialog, clearClassroomListFormStates]);

  const handleSubmit = useCallback(
    (updateClassroomListForm: ClassroomListForm) => {
      const handledClassroomListFormBody = handleClassroomListFormBody(
        updateClassroomListForm,
      );
      console.log(handledClassroomListFormBody);
      const onSuccess = () => {
        clearClassroomListFormStates();
        toast({
          title: `Lista ${isEditing ? "atualizada" : "criada"} com sucesso!`,
          variant: "success",
        });
        handleClose();
        updateCachedListOfClassroom(
          currentListToEdit?.uuid!,
          handledClassroomListFormBody,
        );
      };
      const onError = () => {
        toast({
          title: "Erro",
          description: `Erro ao ${isEditing ? "atualizar" : "criar"} lista`,
          variant: "danger",
          direction: "bottom-right",
        });
      };

      if (isEditing) {
        updateClassroomList(handledClassroomListFormBody, {
          onSuccess,
          onError,
        });
        return;
      }
      createClassroomList(handledClassroomListFormBody, {
        onSuccess,
        onError,
      });
    },
    [
      isEditing,
      createClassroomList,
      toast,
      clearClassroomListFormStates,
      updateClassroomList,
      currentListToEdit?.uuid,
      handleClose,
    ],
  );

  return {
    classroomListFormState,
    classroomListFormControl,
    isSubmitting,
    hasRangeDate,
    isEditing,
    showClassroomListFormDialog,
    handleClassroomListFormSubmit,
    resetClassroomListForm,
    setClassroomListFormValue,
    clearClassroomListFormErrors,
    classroomListFormRegister,
    handleClose,
    updateClassroomList: handleClassroomListFormSubmit(handleSubmit),
  };
};
