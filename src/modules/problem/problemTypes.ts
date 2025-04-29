import { IClassroom } from "../classroom/classroomType";
import { IList } from "../list/listProblemTypes";
import { ISubmission } from "../submission/submissionType";
import { IUser } from "../user/userTypets";

export interface IProblemTest {
  id: string;
  input: string;
  expectedOutput: string;
}
export const ProblemSolveStatusEnum = {
  1: "Resolvido",
  2: "Não resolvido",
  3: "Errado",
};

export interface IProblem {
  uuid?: string;
  title?: string;
  category?: { id: string; name: string };
  description?: string;
  testCases?: IProblemTest[];
  difficulty?: string;
  classroom?: IClassroom;
  listProblem?: IList;
  classroomId?: string;
  listId?: string;
  status?: number;
  submissionStats?: ISubmission & {
    correctSubmissionsCount?: number;
    incorrectSubmissionsCount?: number;
  };
  author?: IUser;
}

export enum ProblemQueryKey {
  PROBLEMS = "problems",
  PROBLEM = "problem",
  PROBLEMS_BY_CLASSROOM = "problemsByClassroom",
}
