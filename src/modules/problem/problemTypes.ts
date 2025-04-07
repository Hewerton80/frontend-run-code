import { IClassroom } from "../classroom/classroomType";
import { IListProblem } from "../listProblem/listProblemTypes";
import { ISubmission } from "../submission/submissionType";

export interface IProblemTest {
  id: string;
  input: string;
  output: string;
}
export const ProblemSolveStatusEnum = {
  1: "Resolvido",
  2: "Não resolvido",
  3: "Errado",
};

export interface IProblem {
  id?: string;
  title?: string;
  code?: string;
  category?: { id: string; name: string };
  description?: string;
  testCases?: IProblemTest[];
  difficulty?: string;
  solveStatus?: number;
  classroom?: IClassroom;
  listProblem?: IListProblem;
  classroomId?: string;
  listId?: string;
  submissionStats?: ISubmission & {
    correctSubmissionsCount?: number;
    incorrectSubmissionsCount?: number;
  };
}

export enum ProblemQueryKey {
  PROBLEMS = "problems",
  PROBLEMS_BY_CLASSROOM = "problemsByClassroom",
}
