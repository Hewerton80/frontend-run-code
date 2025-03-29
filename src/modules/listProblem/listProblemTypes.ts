import { IClassroom } from "../classroom/classroomType";

export interface IListProblem {
  id: string;
  title: string;
  startDate?: string;
  endData?: string;
  solved?: number;
  total?: number;
  classroom?: IClassroom;
}
