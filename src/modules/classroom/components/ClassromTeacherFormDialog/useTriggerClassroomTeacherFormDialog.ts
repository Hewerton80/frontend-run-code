import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";

export const useTriggerClassroomTeacherFormDialog = () => {
  const SHOW_PARAM_NAME = "showClassroomTeacherFormDialog";
  const TEACHER_ID_PARAM_NAME = "teacherIdToEdit";

  const [showClassroomTeacherFormDialog, setShowClassroomTeacherFormDialog] =
    useQueryState(SHOW_PARAM_NAME, parseAsBoolean.withDefault(false));

  const [teacherIdToEdit, setTeacherIdToEdit] = useQueryState(
    TEACHER_ID_PARAM_NAME,
    parseAsString.withDefault(""),
  );

  const closeClassroomTeacherFormDialog = useCallback(() => {
    setShowClassroomTeacherFormDialog(null);
    setTeacherIdToEdit(null);
  }, [setTeacherIdToEdit, setShowClassroomTeacherFormDialog]);

  const showClassroomTeacherFormDialogWithTeacherId = useCallback(
    (teacherId: string | null) => {
      setTeacherIdToEdit(teacherId);
      setShowClassroomTeacherFormDialog(true);
    },
    [setTeacherIdToEdit, setShowClassroomTeacherFormDialog],
  );

  return {
    teacherIdToEdit: teacherIdToEdit || null,
    showClassroomTeacherFormDialog,
    closeClassroomTeacherFormDialog,
    showClassroomTeacherFormDialogWithTeacherId,
  };
};
