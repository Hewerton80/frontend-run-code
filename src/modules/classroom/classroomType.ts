import { IListProblem } from "../list/listProblemTypes";
import { IUser } from "../user/userTypets";

export const StatusClassroomEnum: Record<number, string> = {
  1: "Aberto",
  2: "Fechada",
};

export interface IClassroom {
  uuid?: string;
  name?: string;
  description?: string;
  listsProblems?: IListProblem[];
  author?: IUser;
  status?: number;
  createdAt?: string;
}

export enum ClassroomKeys {
  PaginedClassrooms = "paginedClassrooms",
  List = "classroomList",
  Users = "classroomUsers",
  Details = "classroomDetails",
}
