import { IListProblem } from "../listProblem/listProblemTypes";

export interface IClassroom {
  uuid?: string;
  name?: string;
  description?: string;
  listsProblems?: IListProblem[];
  author?: {
    name: string;
    email: string;
  };
}

export enum ClassroomKeys {
  List = "classroomList",
  Users = "classroomUsers",
  Details = "classroomDetails",
}
