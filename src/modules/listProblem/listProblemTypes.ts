import { IClassroom } from "../classroom/classroomType";
import { IUser } from "../user/userTypets";

export interface IListProblem {
  uuid?: string;
  title: string;
  startDate?: string;
  endDate?: string;
  solved?: number;
  totalProblems?: number;
  classroom?: IClassroom;
  author?: IUser;
  createdAt?: string;
}

export enum ListProblemQueryKey {
  LIST = "LIST_PROBLEMS",
}
