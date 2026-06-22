import { IClassroom } from "../classroom/classroomType";
import { IList } from "../list/listTypes";
import { ISubmission, SubmissionStatus } from "../submission/submissionType";
import { IUser } from "../user/userTypets";

export enum ExerciseStatus {
  DRAFT = 1,
  PUBLISHED = 2,
  HIDDEN = 3,
}

export interface IExerciseTest {
  id: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export interface IExercise {
  id: number;
  uuid: string;
  title?: string;
  category?: { id: string; name: string };
  description?: string;
  testCases?: IExerciseTest[];
  difficulty?: string;
  classroom?: IClassroom;
  status: ExerciseStatus;
  listExercise?: IList;
  classroomId?: string;
  listId?: string;
  submissionStatus?: SubmissionStatus;
  author?: IUser;
  createdAt?: string;
  submissionStats?: ISubmission & {
    correctSubmissionsCount?: number;
    incorrectSubmissionsCount?: number;
  };
}

export enum ExerciseQueryKey {
  EXERCISES = "exercises",
  EXERCISE = "exercise",
  EXERCISES_BY_CLASSROOM = "exercisesByClassroom",
  EXERCISE_OF_LIST = "exerciseList",
}
