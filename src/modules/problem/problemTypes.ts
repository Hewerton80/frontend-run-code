import { IClassroom } from "../classroom/classroomType";
import { IListProblem } from "../listProblem/listProblemTypes";

export interface IProblemTest {
  id: string;
  inputs: string[];
  expectedOutput: string;
}
export const ProblemSolveStatusEnum = {
  1: "Resolvido",
  2: "Não resolvido",
  3: "Errado",
};

export interface IProblem {
  id: string;
  title?: string;
  description?: string;
  tests?: IProblemTest[];
  difficulty?: string;
  solveStatus?: number;
  classroom?: IClassroom;
  listProblem?: IListProblem;
}

export enum ProblemQueryKey {
  PROBLEMS = "problems",
}
