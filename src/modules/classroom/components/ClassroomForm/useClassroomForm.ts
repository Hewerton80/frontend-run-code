import { useCallback } from "react";
import { useClassroomFormSchema } from "../../schemas/classroomFormSchema";

export const useClassroomForm = () => {
  const {
    teachers,
    classroomFormState,
    classroomFormControl,
    addTeacher,
    registerClassroomForm,
  } = useClassroomFormSchema();

  const handleAddTeacher = useCallback(() => {
    addTeacher({
      id: "",
      canEditClassroom: false,
      canManageTeachers: false,
      canCreateList: false,
      canEditList: false,
      canDeleteList: false,
      canManageExercises: false,
      canRemoveMember: false,
    });
  }, [addTeacher]);

  return {
    teachers,
    classroomFormState,
    classroomFormControl,
    addTeacher: handleAddTeacher,
    registerClassroomForm,
  };
};
