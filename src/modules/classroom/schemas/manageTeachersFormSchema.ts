import { CONSTANTS } from "@/utils/constants";
import { isNumber } from "@/utils/isType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const {
  VALIDATION: { REQUIRED_FIELD },
} = CONSTANTS;

const verifyIfHasDublicateIdTeacherAndReturnIndex = (ids: string[]) => {
  if (ids.length <= 1) return -1;
  const uniqueIds = new Set<string>();
  for (let i = 0; i < ids.length; i++) {
    const currentId = ids[i];
    if (uniqueIds.has(currentId)) {
      return i; // Return the index of the duplicate id
    }
    uniqueIds.add(currentId);
  }
  return -1; // No duplicates found
};

export const manageTeachersFormSchema = z
  .object({
    name: z.string().min(1, REQUIRED_FIELD),
    isVisible: z.boolean(),
    isAddTeachers: z.boolean(),
    languages: z.array(
      z.object({
        label: z.string().min(1, REQUIRED_FIELD),
        value: z.string().min(1, REQUIRED_FIELD),
      })
    ),
    teachers: z.array(
      z.object({
        value: z.string().min(1, REQUIRED_FIELD),
        label: z.string().optional(),
        uuid: z.string().optional(),
        canEditClassroom: z.boolean(),
        canManageTeachers: z.boolean(),
        canCreateList: z.boolean(),
        canEditList: z.boolean(),
        canDeleteList: z.boolean(),
        canManageExercises: z.boolean(),
        canRemoveMember: z.boolean(),
      })
    ),
  })
  .refine(
    ({ teachers }) => {
      const ids = teachers.map((teacher) => teacher.value);
      const index = verifyIfHasDublicateIdTeacherAndReturnIndex(ids);
      return index === -1;
    },
    ({ teachers }) => {
      const ids = teachers.map((teacher) => teacher.value);
      const index = verifyIfHasDublicateIdTeacherAndReturnIndex(ids);
      if (index === -1) return { path: [], message: "" };
      return {
        path: [`teachers.${index}.value`],
        message: "Esse professor já foi adicionado",
      };
    }
  );

export type ManageTeachersFormSchema = z.infer<typeof manageTeachersFormSchema>;

export const useManageTeachersFormSchema = () => {
  const defaultValues = useMemo<ManageTeachersFormSchema>(
    () => ({
      name: "",
      isVisible: false,
      languages: [],
      isAddTeachers: false,
      teachers: [],
    }),
    []
  );

  const {
    formState: classroomFormState,
    control: classroomFormControl,
    register: registerClassroomForm,
    watch: watchClassroomForm,
    handleSubmit: handleClassroomFormSubmit,
    reset: resetClassroomForm,
  } = useForm<ManageTeachersFormSchema>({
    defaultValues,
    resolver: zodResolver(manageTeachersFormSchema),
    mode: "onTouched",
  });

  const {
    fields: teachers,
    append: addTeacher,
    remove: removeTeacher,
  } = useFieldArray({
    name: "teachers",
    control: classroomFormControl,
  });

  return {
    teachers,
    classroomFormState,
    classroomFormControl,
    resetClassroomForm,
    handleClassroomFormSubmit,
    watchClassroomForm,
    addTeacher,
    removeTeacher,
    registerClassroomForm,
  };
};
