export interface IProblemTest {
  id: string;
  inputs: string[];
  expectedOutput: string;
}

export interface IProblem {
  id: string;
  title: string;
  description: string;
  tests: IProblemTest[];
  difficulty: string;
}

export enum ProblemQueryKey {
  PROBLEMS = "problems",
}
