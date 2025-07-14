import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLoginPage from "./pages/AuthLoginPage";
import HomePage from "./pages/HomePage";
import InLayoutPage from "./pages/InLayoutPage";
import ClassroomListsPage from "./pages/ClassroomListsPage";
import ClassroomLayoutPage from "./pages/classroomLayoutPage";
import ExercisesPage from "./pages/ExercisesPage";
import ClassroomExercisePage from "./pages/ClassRoomExercisePage";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route index path="/login" element={<AuthLoginPage />} />
        <Route path="in" element={<InLayoutPage />}>
          <Route path="home" element={<HomePage />} />
          <Route
            path="classroom/:classroomId"
            element={<ClassroomLayoutPage />}
          >
            <Route path="lists" element={<ClassroomListsPage />} />
            <Route
              path="lists/:listId/exercise/:exerciseId"
              element={<ClassroomExercisePage />}
            />
          </Route>
          <Route path="exercises" element={<ExercisesPage />} />
        </Route>

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
