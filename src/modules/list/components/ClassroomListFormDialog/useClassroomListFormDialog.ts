import {
  IUpdateClassroomListBody,
  useUpdateClasrromList,
} from "@/modules/classroom/hooks/useUpdateClasrromList";
import {
  ClassroomListForm,
  useClassroomListFormSchema,
} from "../../schemas/classroomListFormSchema";
import { IList } from "../../listTypes";
import { useCallback, useEffect } from "react";
import { DateTime } from "@/utils/dateTime";
import { useQueryClient } from "@tanstack/react-query";
import { ClassroomKeys } from "@/modules/classroom/classroomType";
import { useToast } from "@/hooks/useToast";
import {
  ICreateClassroomListBody,
  useCreateClasrromList,
} from "@/modules/classroom/hooks/useCreateClasrromList";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useParams } from "react-router-dom";

export const useClassroomListFormDialog = (
  currentListToEdit?: IList | null
) => {
  const params = useParams<{ classroomId: string }>();

  const isEdit = !!currentListToEdit?.uuid;

  const { classroom } = useGetClassroomById(params?.classroomId);

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

  const queryClient = useQueryClient();

  const { createClassroomList, isCraetingClassroomList } =
    useCreateClasrromList();

  const { isUpdatingClassroomList, updateClassroomList } =
    useUpdateClasrromList();

  const isSubmitting = isCraetingClassroomList || isUpdatingClassroomList;

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
        title: currentListToEdit?.title,
        hasRangeDate,
        startDate: hasRangeDate ? DateTime.format(startDate, "yyyy-MM-dd") : "",
        endDate: hasRangeDate ? DateTime.format(endDate, "yyyy-MM-dd") : "",
        isVisible: currentListToEdit?.status === 2,
      });
    }
  }, [currentListToEdit, resetClassroomListForm]);

  const getHandleClassroomListFormBody = useCallback(
    (updateClassroomListForm: ClassroomListForm) => {
      const result: ICreateClassroomListBody & IUpdateClassroomListBody = {
        title: updateClassroomListForm.title,
        classroomId: classroom?.uuid as string,
        startDate: updateClassroomListForm.hasRangeDate
          ? `${updateClassroomListForm?.startDate!} 00:00:00`
          : null,
        endDate: updateClassroomListForm.hasRangeDate
          ? `${updateClassroomListForm?.endDate!} 23:59:59`
          : null,
        status: updateClassroomListForm.isVisible ? 2 : 1,
      };
      if (currentListToEdit?.id) {
        result.listId = currentListToEdit?.id;
      }
      return result;
    },
    [currentListToEdit, classroom]
  );

  const handleSubmit = useCallback(
    (updateClassroomListForm: ClassroomListForm) => {
      const onSuccess = () => {
        clearClassroomListFormStates();
        toast({
          title: `Lista ${isEdit ? "atualizada" : "criada"} com sucesso!`,
          variant: "success",
        });
        queryClient.resetQueries({
          queryKey: [ClassroomKeys.Details, classroom?.uuid],
        });
      };
      const onError = () => {
        toast({
          title: "Erro",
          description: `Erro ao ${isEdit ? "atualizar" : "criar"} lista`,
          variant: "danger",
          direction: "bottom-right",
        });
      };
      const handleClassroomListFormBody = getHandleClassroomListFormBody(
        updateClassroomListForm
      );
      if (isEdit) {
        updateClassroomList(handleClassroomListFormBody, {
          onSuccess,
          onError,
        });
      } else {
        createClassroomList(handleClassroomListFormBody, {
          onSuccess,
          onError,
        });
      }
    },
    [
      isEdit,
      queryClient,
      classroom,
      createClassroomList,
      toast,
      clearClassroomListFormStates,
      getHandleClassroomListFormBody,
      updateClassroomList,
    ]
  );

  return {
    classroomListFormState,
    classroomListFormControl,
    isSubmitting,
    hasRangeDate,
    handleClassroomListFormSubmit,
    resetClassroomListForm,
    setClassroomListFormValue,
    clearClassroomListFormErrors,
    classroomListFormRegister,
    clearClassroomListFormStates,
    updateClassroomList: handleClassroomListFormSubmit(handleSubmit),
  };
};
