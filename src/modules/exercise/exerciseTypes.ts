export enum ExerciseStatus {
  DRAFT = 1,
  PUBLISHED = 2,
  HIDDEN = 3,
}

export const ExerciseStatusNames: Record<ExerciseStatus | number, string> = {
  [ExerciseStatus.DRAFT]: "Rascunho",
  [ExerciseStatus.PUBLISHED]: "Pública",
  [ExerciseStatus.HIDDEN]: "Oculta",
};

export interface IExerciseTestCase {
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export const DIFF_META: Record<
  number,
  { label: string; stars: number; art: string; tone: string }
> = {
  1: {
    label: "Muito Fácil",
    stars: 1,
    art: "card-art-easy",
    tone: "text-success",
  },
  2: {
    label: "Fácil",
    stars: 2,
    art: "card-art-easy",
    tone: "text-success",
  },
  3: {
    label: "Médio",
    stars: 3,
    art: "card-art-medium",
    tone: "text-warning",
  },
  4: {
    label: "Difícil",
    stars: 4,
    art: "card-art-hard",
    tone: "text-destructive",
  },
  5: {
    label: "Muito Difícil",
    stars: 5,
    art: "card-art-very-hard",
    tone: "text-destructive",
  },
};

export enum ExerciseQueryKey {
  EXERCISES = "exercises",
  EXERCISE = "exercise",
  EXERCISES_BY_CLASSROOM = "exercisesByClassroom",
  EXERCISE_OF_LIST = "exerciseList",
}
