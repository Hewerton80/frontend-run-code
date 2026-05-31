/**
 * Enum de query keys do módulo classroom.
 * Os valores são mantidos iguais ao enum legado `ClassroomKeys` de `classroomType.ts`
 * para garantir compatibilidade de cache com componentes que ainda usam o enum antigo.
 */
export enum ClassroomQueryKeys {
  /** Lista paginada de turmas */
  Classrooms = "paginedClassrooms",
  /** Lista de turmas do usuário logado */
  MyClassrooms = "classroomList",
  /** Detalhe de uma turma por ID */
  Classroom = "classroomDetails",
  ClassroomCard = "classroomCard",
  /** Lista de usuários de uma turma */
  ClassroomUsers = "classroomUsers",
  /** Detalhe de um usuário de uma turma */
  ClassroomUserDetail = "classroomUserDetail",
  ClassroomUserRow = "classroomUserRow",
}
