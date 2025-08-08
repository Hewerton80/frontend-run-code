export enum RoleUser {
  STUDENT = 1,
  TEACHER = 2,
  SUPER_ADMIN = 3,
}
export type RoleType = keyof typeof RoleUser | (string & {});

export type RolesNames =
  | "Aluno(a)"
  | "Professor(a)"
  | "Super Admin"
  | (string & {});

export const RoleUserEnum: Record<RoleUser | number, RolesNames> = {
  [RoleUser.STUDENT]: "Aluno(a)",
  [RoleUser.TEACHER]: "Professor(a)",
  [RoleUser.SUPER_ADMIN]: "Super Admin",
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
  role: RoleUser;
  createdAt?: string;
}

export type ITeacher = IUser & TeacherPermissions;

export enum UserKey {
  List = "List",
}
