export const RoleUserEnum: Record<number, string> = {
  1: "Aluno(a)",
  2: "Professor(a)",
  3: "Super Admin",
};

export type TeacherPermissions = {
  canEditClassroom: boolean;
  canManageTeachers: boolean;
  canCreateList: boolean;
  canEditList: boolean;
  canDeleteList: boolean;
  canManageExercises: boolean;
  canRemoveMember: boolean;
};

export interface IUser {
  id?: string;
  uuid?: string;
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
  avatarBgColor?: string;
  avatarFontColor?: string;
  role: number;
  createdAt?: string;
}

export type ITeacher = IUser & TeacherPermissions;

export enum UserKey {
  List = "List",
}
