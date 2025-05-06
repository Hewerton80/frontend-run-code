export const RoleUserEnum: Record<number, string> = {
  1: "Aluno(a)",
  2: "Professor(a)",
  3: "Super Admin",
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

export enum UserKey {
  List = "List",
}
