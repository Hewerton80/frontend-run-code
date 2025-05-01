import { CONSTANTS } from "@/utils/constants";
import { z } from "zod";
import { REGEX } from "@/utils/regex";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { DateTime } from "@/utils/dateTime";

const {
  VALIDATION: { INVALID_DATE, REQUIRED_FIELD },
} = CONSTANTS;

export const classroomListFormSchemaSchema = z
  .object({
    //   id: z.string().min(1, REQUIRED_FIELD),
    title: z.string().min(1, REQUIRED_FIELD),
    hasRangeDate: z.boolean(),
    startDate: z
      .string()
      .refine(
        (startDate) =>
          startDate
            ? startDate.match(REGEX.isoDate) && DateTime.isValid(startDate)
            : true,
        INVALID_DATE
      )
      .optional(),
    endDate: z
      .string()
      .refine(
        (endDate) =>
          endDate
            ? endDate.match(REGEX.isoDate) && DateTime.isValid(endDate)
            : true,
        INVALID_DATE
      )
      .optional(),
    isVisible: z.boolean(),
  })
  .refine(
    ({ startDate, hasRangeDate }) => (hasRangeDate ? !!startDate : true),
    {
      path: ["startDate"],
      message: REQUIRED_FIELD,
    }
  )
  .refine(({ endDate, hasRangeDate }) => (hasRangeDate ? !!endDate : true), {
    path: ["endDate"],
    message: REQUIRED_FIELD,
  })
  .refine(
    ({ startDate, endDate, hasRangeDate }) => {
      if (
        startDate?.match(REGEX.isoDate) &&
        endDate?.match(REGEX.isoDate) &&
        hasRangeDate
      ) {
        return (
          DateTime.isBefore(startDate, endDate) ||
          DateTime.isSameDay(startDate, endDate)
        );
      }
      return true;
    },
    {
      path: ["endDate"],
      message: "Data de fim deve ser maior ou igual que a data de início",
    }
  );

export type ClassroomListForm = z.infer<typeof classroomListFormSchemaSchema>;

export const useClassroomListFormSchema = () => {
  const defaultValues = useMemo<ClassroomListForm>(
    () => ({
      title: "",
      hasRangeDate: true,
      startDate: "",
      endDate: "",
      isVisible: false,
    }),
    []
  );

  const {
    formState: classroomListFormState,
    control: classroomListFormControl,
    handleSubmit: handleClassroomListFormSubmit,
    reset: resetClassroomListForm,
    setValue: setClassroomListFormValue,
    clearErrors: clearClassroomListFormErrors,
    register: classroomListFormRegister,
    watch: watchClassroomListForm,
  } = useForm<ClassroomListForm>({
    defaultValues: defaultValues,
    mode: "onTouched",
    resolver: zodResolver(classroomListFormSchemaSchema),
  });

  const clearClassroomListFormStates = useCallback(() => {
    resetClassroomListForm(defaultValues);
    clearClassroomListFormErrors();
  }, [resetClassroomListForm, clearClassroomListFormErrors, defaultValues]);

  return {
    classroomListFormState,
    classroomListFormControl,
    watchClassroomListForm,
    handleClassroomListFormSubmit,
    resetClassroomListForm,
    setClassroomListFormValue,
    clearClassroomListFormStates,
    clearClassroomListFormErrors,
    classroomListFormRegister,
  };
};
