import { IClassroom } from "../classroom/classroomType";

export interface IListProblem {
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  solved?: number;
  totalProblems?: number;
  classroom?: IClassroom;
}
