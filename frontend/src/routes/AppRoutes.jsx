import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AuthLayout from "../components/auth/AuthLayout";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import App from "../App";
import Projects from "../features/projects/Projects";
import ProjectDetails from "../features/projects/ProjectDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
