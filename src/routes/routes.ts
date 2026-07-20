export const ROUTE_PATTERNS = {
  // Auth
  LOGIN: "/login",
  BG_TESTE: "/bg-teste",

  // Geral
  TESTE: "/teste",
  HOME: "/home",
  PLAYGROUND: "/playground",

  // Profile
  PROFILE: "/profile",

  // Exercises
  EXERCISES: "/exercises",
  EXERCISES_CREATE: "/exercises/create",
  EXERCISES_EDIT: "/exercises/:exerciseId/edit",
  EXERCISE_DETAIL: "/exercises/:exerciseId/info",

  // Admin
  USERS: "/users",
  CLASSROOMS: "/classrooms",
  LISTS: "/lists",

  // Classroom (path relativo — usado como filho de CLASSROOM no router)
  CLASSROOM: "/classroom/:classroomId",
  CLASSROOM_LISTS: "lists",
  CLASSROOM_USERS: "users",
  CLASSROOM_LIST_EXERCISE: "lists/:listId/exercise/:exerciseId",
} as const;

/**
 * ROUTES — URLs absolutas para uso em navigate(), <Link to>, <Navigate to>.
 * Strings estáticas são usadas diretamente; funções recebem parâmetros e
 * retornam a URL absoluta montada via template literal.
 */
export const ROUTES = {
  // Auth
  LOGIN: ROUTE_PATTERNS.LOGIN,
  BG_TESTE: ROUTE_PATTERNS.BG_TESTE,
  // Geral
  TESTE: ROUTE_PATTERNS.TESTE,
  HOME: ROUTE_PATTERNS.HOME,
  PLAYGROUND: ROUTE_PATTERNS.PLAYGROUND,

  // Profile
  PROFILE: ROUTE_PATTERNS.PROFILE,

  // Exercises
  EXERCISES: ROUTE_PATTERNS.EXERCISES,
  EXERCISES_CREATE: ROUTE_PATTERNS.EXERCISES_CREATE,
  EXERCISES_EDIT: (exerciseId: string) => `/exercises/${exerciseId}/edit`,
  EXERCISE_DETAIL: (exerciseId: string) => `/exercises/${exerciseId}/info`,

  // Admin
  USERS: ROUTE_PATTERNS.USERS,
  CLASSROOMS: ROUTE_PATTERNS.CLASSROOMS,
  LISTS: ROUTE_PATTERNS.LISTS,

  // Classroom — funções geram URLs absolutas para navegação
  CLASSROOM: (classroomId: string) => `/classroom/${classroomId}`,
  CLASSROOM_LISTS: (classroomId: string) => `/classroom/${classroomId}/lists`,
  CLASSROOM_USERS: (classroomId: string) => `/classroom/${classroomId}/users`,
  CLASSROOM_LIST_EXERCISE: (
    classroomId: string,
    listId: number,
    exerciseId: string,
  ) => `/classroom/${classroomId}/lists/${listId}/exercise/${exerciseId}`,
};
