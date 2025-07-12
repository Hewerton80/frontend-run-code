import { IClassroom } from "../classroom/classroomType";
import { IList } from "../list/listTypes";
import { ISubmission } from "../submission/submissionType";
import { IUser } from "../user/userTypets";

export interface IExerciseTest {
  id: string;
  input: string;
  expectedOutput: string;
}
export const ExerciseSolveStatusEnum = {
  1: "Resolvido",
  2: "Não resolvido",
  3: "Errado",
};

export interface IExercise {
  id?: number;
  uuid?: string;
  title?: string;
  category?: { id: string; name: string };
  description?: string;
  testCases?: IExerciseTest[];
  difficulty?: string;
  classroom?: IClassroom;
  listExercise?: IList;
  classroomId?: string;
  listId?: string;
  status?: number;
  author?: IUser;
  createdAt?: string;
  submissionStats?: ISubmission & {
    correctSubmissionsCount?: number;
    incorrectSubmissionsCount?: number;
  };
}

export enum ExerciseQueryKey {
  PROBLEMS = "exercises",
  PROBLEM = "exercise",
  PROBLEMS_BY_CLASSROOM = "exercisesByClassroom",
}
