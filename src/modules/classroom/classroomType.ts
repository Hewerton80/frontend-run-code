import { IList } from "../list/listTypes";
import { ITeacher, IUser, TeacherPermissions } from "../user/userTypets";

export const StatusClassroomEnum: Record<number, string> = {
  1: "Aberto",
  2: "Fechada",
};

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
  myClassroomPermissions?: TeacherPermissions;
}

export enum ClassroomKeys {
  PaginedClassrooms = "paginedClassrooms",
  List = "classroomList",
  Users = "classroomUsers",
  User = "classroomUser",
  Details = "classroomDetails",
}
