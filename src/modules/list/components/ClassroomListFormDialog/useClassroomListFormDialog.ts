import {
  IUpdateClassroomListBody,
  useUpdateClasrromList,
} from "@/modules/classroom/hooks/useUpdateClasrromList";
import {
  UpdateClassroomListForm,
  useUpdateclassroomListFormSchema,
} from "../../schemas/updateclassroomListFormSchema";
import { IListProblem } from "../../listProblemTypes";
import { useCallback, useEffect } from "react";
import { DateTime } from "@/utils/dateTime";
import { useQueryClient } from "@tanstack/react-query";
import { ClassroomKeys } from "@/modules/classroom/classroomType";
import { useToast } from "@/hooks/useToast";

export const useClassroomListFormDialog = (
  currentListToEdit: IListProblem | null
) => {
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
  } = useUpdateclassroomListFormSchema();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isUpdatingClassroomList, updateClassroomList } =
    useUpdateClasrromList();

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
        hasRangeDate,
        startDate: hasRangeDate ? DateTime.format(startDate, "yyyy-MM-dd") : "",
        endDate: hasRangeDate ? DateTime.format(endDate, "yyyy-MM-dd") : "",
        isVisible: currentListToEdit?.status === 2,
      });
    } else {
      clearClassroomListFormStates();
    }
  }, [currentListToEdit, resetClassroomListForm, clearClassroomListFormStates]);

  const getHandleClassroomListFormBody = useCallback(
    (
      updateClassroomListForm: UpdateClassroomListForm
    ): IUpdateClassroomListBody => {
      return {
        classroomId: currentListToEdit?.classroom?.uuid as string,
        listId: currentListToEdit?.id as number,
        startDate: updateClassroomListForm.hasRangeDate
          ? `${updateClassroomListForm?.startDate!} 00:00:00`
          : null,
        endDate: updateClassroomListForm.hasRangeDate
          ? `${updateClassroomListForm?.endDate!} 23:59:59`
          : null,
        status: updateClassroomListForm.isVisible ? 2 : 1,
      };
    },
    [currentListToEdit]
  );
  const handleSubmit = useCallback(
    (updateClassroomListForm: UpdateClassroomListForm) => {
      const onSuccess = () => {
        clearClassroomListFormStates();
        toast({
          title: "Lista atualizada com sucesso!",
          variant: "success",
        });
        queryClient.resetQueries({
          queryKey: [ClassroomKeys.Details, currentListToEdit?.classroom?.uuid],
        });
      };
      const onError = () => {
        toast({
          title: "Erro",
          description: "Erro ao atualizar lista",
          variant: "danger",
        });
      };
      const handleClassroomListFormBody = getHandleClassroomListFormBody(
        updateClassroomListForm
      );
      console.log(handleClassroomListFormBody);
      updateClassroomList(handleClassroomListFormBody, { onSuccess, onError });
    },
    [
      currentListToEdit,
      queryClient,
      toast,
      clearClassroomListFormStates,
      getHandleClassroomListFormBody,
      updateClassroomList,
    ]
  );

  return {
    classroomListFormState,
    classroomListFormControl,
    isUpdatingClassroomList,
    hasRangeDate,
    handleClassroomListFormSubmit,
    resetClassroomListForm,
    setClassroomListFormValue,
    clearClassroomListFormErrors,
    classroomListFormRegister,
    updateClassroomList: handleClassroomListFormSubmit(handleSubmit),
  };
};
