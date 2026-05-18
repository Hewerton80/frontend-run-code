export const ROUTE_PATTERNS = {
  // Auth
  LOGIN: "/login",

  // Geral
  TESTE: "/teste",
  HOME: "/home",
  PLAYGROUND: "/playground",

  // Profile
  PROFILE: "/profile",

  // Exercises
  EXERCISES: "/exercises",
  EXERCISES_CREATE: "/exercises/create",
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
  CLASSROOM_LIST_UPDATE: "lists/:listId/update-exercises",
} as const;

/**
 * ROUTES — URLs absolutas para uso em navigate(), <Link to>, <Navigate to>.
 * Strings estáticas são usadas diretamente; funções recebem parâmetros e
 * retornam a URL absoluta montada via template literal.
 */
export const ROUTES = {
  // Auth
  LOGIN: ROUTE_PATTERNS.LOGIN,

  // Geral
  TESTE: ROUTE_PATTERNS.TESTE,
  HOME: ROUTE_PATTERNS.HOME,
  PLAYGROUND: ROUTE_PATTERNS.PLAYGROUND,

  // Profile
  PROFILE: ROUTE_PATTERNS.PROFILE,

  // Exercises
  EXERCISES: ROUTE_PATTERNS.EXERCISES,
  EXERCISES_CREATE: ROUTE_PATTERNS.EXERCISES_CREATE,
  EXERCISE_DETAIL: (exerciseId: string | number) =>
    `/exercises/${exerciseId}/info`,

  // Admin
  USERS: ROUTE_PATTERNS.USERS,
  CLASSROOMS: ROUTE_PATTERNS.CLASSROOMS,
  LISTS: ROUTE_PATTERNS.LISTS,

  // Classroom — funções geram URLs absolutas para navegação
  CLASSROOM: (classroomId: string | number) => `/classroom/${classroomId}`,
  CLASSROOM_LISTS: (classroomId: string | number) =>
    `/classroom/${classroomId}/lists`,
  CLASSROOM_USERS: (classroomId: string | number) =>
    `/classroom/${classroomId}/users`,
  CLASSROOM_LIST_EXERCISE: (
    classroomId: string | number,
    listId: string | number,
    exerciseId: string | number,
  ) => `/classroom/${classroomId}/lists/${listId}/exercise/${exerciseId}`,
  CLASSROOM_LIST_UPDATE: (
    classroomId: string | number,
    listId: string | number,
  ) => `/classroom/${classroomId}/lists/${listId}/update-exercises`,
};
