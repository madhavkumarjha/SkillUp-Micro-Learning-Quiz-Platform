import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";
import InstructorLayout from "./layouts/InstructorLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import InstructorDashboard from "./pages/instructor/InstructorDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            // <ProtectedRoute roles={['student']}>
            <StudentLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
        </Route>

        {/* Instructor Routes */}
        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute roles={["instructor"]}>
              <InstructorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InstructorDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
