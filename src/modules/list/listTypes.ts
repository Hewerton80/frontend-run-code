import { IClassroom } from "../classroom/classroomType";
import { IUser } from "../user/userTypets";

export interface IList {
  id?: number;
  uuid?: string;
  title: string;
  startDate?: string;
  endDate?: string;
  solved?: number;
  totalExercises?: number;
  classroom?: IClassroom;
  author?: IUser;
  createdAt?: string;
  status?: number;
}

export enum ListQueryKey {
  LIST = "LIST_PROBLEMS",
}
