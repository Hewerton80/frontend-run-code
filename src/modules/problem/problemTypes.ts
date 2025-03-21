export interface IProblemTest {
  id: number;
  inputs: string[];
  expectedOutput: string;
}

export interface IProblem {
  id: number;
  title: string;
  description: string;
  tests: IProblemTest[];
  difficulty: string;
}

export enum ProblemQueryKey {
  PROBLEMS = "problems",
}
