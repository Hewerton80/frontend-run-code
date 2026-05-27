import { IClassroom } from "../classroom/classroomType";
import { IList } from "../list/listTypes";
import { ISubmission, SubmissionStatus } from "../submission/submissionType";
import { IUser } from "../user/userTypets";

export interface IExerciseTest {
  id: string;
  input: string;
  expectedOutput: string;
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
