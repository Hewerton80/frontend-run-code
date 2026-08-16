import { SubmissionJobDto } from "@/modules/submission/types/SubmissionJobDto";
import { RoleUser } from "@/modules/user/userTypets";

export interface LoggedUser {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string;
  avatarBgColor: string;
  role: RoleUser;
  createdAt: string;
  username: string;
  activeJobIds?: string[];
  submissionJobs?: SubmissionJobDto[];
}
