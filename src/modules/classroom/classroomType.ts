import { IList } from "../list/listTypes";
import { IUser } from "../user/userTypets";

export const StatusClassroomEnum: Record<number, string> = {
  1: "Aberto",
  2: "Fechada",
};

export type TeacherPermissions = {
  canEditClassroom: boolean;
  canManageTeachers: boolean;
  canCreateList: boolean;
  canEditList: boolean;
  canDeleteList: boolean;
  canManageExercises: boolean;
  canRemoveMember: boolean;
};
export type ITeacher = IUser & TeacherPermissions;
export interface IClassroom {
  uuid?: string;
  languages?: string;
  name?: string;
  description?: string;
  lists?: IList[];
  author?: IUser;
  teachers?: ITeacher[];
  status?: number;
  createdAt?: string;
}

export enum ClassroomKeys {
  PaginedClassrooms = "paginedClassrooms",
  List = "classroomList",
  Users = "classroomUsers",
  Details = "classroomDetails",
}
