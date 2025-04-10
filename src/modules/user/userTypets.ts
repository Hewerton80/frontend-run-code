export const RoleUserEnum: Record<number, string> = {
  1: "Aluno(a)",
  2: "Professor(a)",
};

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  avatarBgColor?: string;
  avatarInitials?: string;
  avatarFontColor?: string;
  role: number;
}
