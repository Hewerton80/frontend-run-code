import { IClassroom } from "../classroom/classroomType";

export interface IListProblem {
  uuid?: string;
  title: string;
  startDate?: string;
  endDate?: string;
  solved?: number;
  totalProblems?: number;
  classroom?: IClassroom;
}
