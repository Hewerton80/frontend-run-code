import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Providers } from "@/providers";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTE_PATTERNS } from "./routes";

// ── Layouts ───────────────────────────────────────────────────────────────
import InLayoutPage from "@/pages/InLayoutPage";
import { Spinner } from "@/components/ui/feedback/Spinner";

// ── Auth ──────────────────────────────────────────────────────────────────
const AuthLoginPage = lazy(() => import("@/pages/AuthLoginPage"));

// ── Geral ─────────────────────────────────────────────────────────────────
const HomePage = lazy(() => import("@/pages/HomePage"));
const PlayGroundPage = lazy(() => import("@/pages/Playground"));
const NotFound404 = lazy(() =>
  import("@/components/ui/feedback/NotFound404").then((m) => ({
    default: m.NotFound404,
  })),
);

// ── Exercises ─────────────────────────────────────────────────────────────
const ExercisesPage = lazy(() => import("@/pages/ExercisesPage"));
const ExercisePage = lazy(() => import("@/pages/ExercisePage"));
const CreateExercisePage = lazy(() =>
  import("@/pages/CreateExercisePage").then((m) => ({
    default: m.CreateExercisePage,
  })),
);
const EditExercisePage = lazy(() =>
  import("@/pages/EditExercisePage").then((m) => ({
    default: m.EditExercisePage,
  })),
);

// ── Admin ─────────────────────────────────────────────────────────────────
const UsersPage = lazy(() => import("@/pages/UsersPage"));
const ClassroomsPage = lazy(() => import("@/pages/ClassroomsPage"));
const ListPage = lazy(() => import("@/pages/Lists"));

// ── Classroom ─────────────────────────────────────────────────────────────
const ClassroomLayoutPage = lazy(() => import("@/pages/ClassroomLayoutPage"));
const ClassroomListsPage = lazy(() => import("@/pages/ClassroomListsPage"));
const ClassroomExercisePage = lazy(
  () => import("@/pages/ClassRoomExercisePage"),
);
const ClassroomUsersPage = lazy(() => import("@/pages/ClassroomUsersPage"));
const UpdateExercisesListPage = lazy(
  () => import("@/pages/UpdateExercisesListPage"),
);

// ── SuspenseWrapper ───────────────────────────────────────────────────────
function SuspenseWrapper({ element }: { element: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center m-auto">
          <Spinner size={64} />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

// ── Router ────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    element: <Providers />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_PATTERNS.LOGIN} replace />,
      },
      {
        path: ROUTE_PATTERNS.LOGIN,
        element: <SuspenseWrapper element={<AuthLoginPage />} />,
      },
      {
        element: <InLayoutPage />,
        children: [
          {
            path: ROUTE_PATTERNS.HOME,
            element: <SuspenseWrapper element={<HomePage />} />,
          },
          {
            path: ROUTE_PATTERNS.EXERCISES,
            element: <SuspenseWrapper element={<ExercisesPage />} />,
          },
          {
            path: ROUTE_PATTERNS.EXERCISE_DETAIL,
            element: <SuspenseWrapper element={<ExercisePage />} />,
          },
          {
            path: ROUTE_PATTERNS.PLAYGROUND,
            element: <SuspenseWrapper element={<PlayGroundPage />} />,
          },
          // ── Rotas protegidas: SUPER_ADMIN ──────────────────────────────
          {
            element: <ProtectedRoute roles={["SUPER_ADMIN"]} />,
            children: [
              {
                path: ROUTE_PATTERNS.USERS,
                element: <SuspenseWrapper element={<UsersPage />} />,
              },
              {
                path: ROUTE_PATTERNS.CLASSROOMS,
                element: <SuspenseWrapper element={<ClassroomsPage />} />,
              },
              {
                path: ROUTE_PATTERNS.LISTS,
                element: <SuspenseWrapper element={<ListPage />} />,
              },
            ],
          },
          // ── Rotas protegidas: SUPER_ADMIN + TEACHER ────────────────────
          {
            element: <ProtectedRoute roles={["SUPER_ADMIN", "TEACHER"]} />,
            children: [
              {
                path: ROUTE_PATTERNS.EXERCISES_CREATE,
                element: <SuspenseWrapper element={<CreateExercisePage />} />,
              },
              {
                path: ROUTE_PATTERNS.EXERCISES_EDIT,
                element: <SuspenseWrapper element={<EditExercisePage />} />,
              },
            ],
          },
          // ── Classroom (layout aninhado) ────────────────────────────────
          {
            path: ROUTE_PATTERNS.CLASSROOM,
            element: <SuspenseWrapper element={<ClassroomLayoutPage />} />,
            children: [
              {
                path: ROUTE_PATTERNS.CLASSROOM_LISTS,
                element: <SuspenseWrapper element={<ClassroomListsPage />} />,
              },
              {
                path: ROUTE_PATTERNS.CLASSROOM_LIST_EXERCISE,
                element: (
                  <SuspenseWrapper element={<ClassroomExercisePage />} />
                ),
              },
              {
                path: ROUTE_PATTERNS.CLASSROOM_LIST_UPDATE,
                element: (
                  <SuspenseWrapper element={<UpdateExercisesListPage />} />
                ),
              },
              {
                path: ROUTE_PATTERNS.CLASSROOM_USERS,
                element: <SuspenseWrapper element={<ClassroomUsersPage />} />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <SuspenseWrapper element={<NotFound404 />} />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
