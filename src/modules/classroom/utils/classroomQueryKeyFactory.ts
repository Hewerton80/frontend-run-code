import { ClassroomQueryKeys } from "@/modules/classroom/types/ClassroomQueryKeys";

/**
 * Factory de query keys do módulo classroom.
 * Use sempre esta factory em vez de arrays inline para garantir
 * consistência, autocomplete e invalidação segura.
 *
 * Hierarquia:
 *   all → pages(params)
 *   myClassrooms
 *   detail(classroomId)
 *   users(classroomId)
 *   user(classroomId, userId)
 */
export const classroomQueryKeyFactory = {
  /** Raiz de todas as queries de lista paginada de turmas */
  all: () => [ClassroomQueryKeys.Classrooms] as const,

  /** Lista paginada de turmas com params normalizados */
  pages: (params?: object) =>
    [...classroomQueryKeyFactory.all(), params] as const,

  /** Turmas do usuário logado */
  myClassrooms: () => [ClassroomQueryKeys.MyClassrooms] as const,

  /** Detalhe de uma turma por ID */
  detail: (classroomId?: string) =>
    [ClassroomQueryKeys.Classroom, classroomId] as const,
  card: (classroomId?: string) =>
    [ClassroomQueryKeys.ClassroomCard, classroomId] as const,

  /** Lista de usuários de uma turma */
  users: (classroomId: string) =>
    [ClassroomQueryKeys.ClassroomUsers, classroomId] as const,

  /** Detalhe de um usuário específico de uma turma */
  userDetail: (classroomId: string, userId?: string | null) =>
    [ClassroomQueryKeys.ClassroomUserDetail, classroomId, userId] as const,
  row: (classroomId: string, userId?: string | null) =>
    [ClassroomQueryKeys.ClassroomUserRow, classroomId, userId] as const,
};
