import { ICreateClassroomListBody } from "@/modules/classroom/hooks/useCreateClassroomList";
import { ClassroomListForm } from "../schemas/classroomListFormSchema";
import { IUpdateClassroomListBody } from "@/modules/classroom/hooks/useUpdateClassroomList";

export const handleClassroomListFormBody = (
  updateClassroomListForm: ClassroomListForm,
) => {
  const result: ICreateClassroomListBody & IUpdateClassroomListBody = {
    title: updateClassroomListForm.title,
    classroomId: updateClassroomListForm?.classroomId as string,
    startDate: updateClassroomListForm.hasRangeDate
      ? `${updateClassroomListForm?.startDate!} 00:00:00`
      : null,
    endDate: updateClassroomListForm.hasRangeDate
      ? `${updateClassroomListForm?.endDate!} 23:59:59`
      : null,
    status: updateClassroomListForm.isVisible ? 2 : 1,
  };
  if (updateClassroomListForm?.id) {
    result.id = updateClassroomListForm?.id;
  }
  return result;
};
