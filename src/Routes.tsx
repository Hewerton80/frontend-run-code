import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLoginPage from "./pages/AuthLoginPage";
import HomePage from "./pages/HomePage";
import InLayoutPage from "./pages/InLayoutPage";
import ClassroomListsPage from "./pages/ClassroomListsPage";
import ExercisesPage from "./pages/ExercisesPage";
import ClassroomExercisePage from "./pages/ClassRoomExercisePage";
import ClassroomLayoutPage from "./pages/ClassroomLayoutPage";
import ClassroomUsersPage from "./pages/ClassroomUsersPage";
import UpdateExercisesListPage from "./pages/UpdateExercisesListPage";
import UsersPage from "./pages/UsersPage";
import ClassroomsPage from "./pages/ClassroomsPage";
import ListPage from "./pages/Lists";
import PlayGroundPage from "./pages/Playground";
import ExercisePage from "./pages/ExercisePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFound404 } from "./components/ui/feedback/NotFound404";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route element={<InLayoutPage />}>
          <Route path="home" element={<HomePage />} />
          <Route
            path="users"
            element={
              <ProtectedRoute roles={["Super Admin"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="classrooms"
            element={
              <ProtectedRoute roles={["Super Admin"]}>
                <ClassroomsPage />
              </ProtectedRoute>
            }
          />
          <Route path="exercises" element={<ExercisesPage />} />
          <Route path="exercises/:exerciseId" element={<ExercisePage />} />
          <Route
            path="lists"
            element={
              <ProtectedRoute roles={["Super Admin"]}>
                <ListPage />
              </ProtectedRoute>
            }
          />
          <Route path="playground" element={<PlayGroundPage />} />
          <Route
            path="classroom/:classroomId"
            element={<ClassroomLayoutPage />}
          >
            <Route path="lists" element={<ClassroomListsPage />} />
            <Route
              path="lists/:listId/exercise/:exerciseId"
              element={<ClassroomExercisePage />}
            />
            <Route
              path="lists/:listId/update-exercises"
              element={<UpdateExercisesListPage />}
            />
            <Route path="users" element={<ClassroomUsersPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};
