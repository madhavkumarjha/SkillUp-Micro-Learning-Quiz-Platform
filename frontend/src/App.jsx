import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
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
import PublicRoute from "./utils/publicRoute.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  finishInitialization,
  restoreSession,
} from "./redux/features/auth/authSlice.js";
import CreateCourse from "./pages/instructor/course/CreateCourse.jsx";
import UpdateCourse from "./pages/instructor/course/UpdateCourse.jsx";
import Loader from "./components/Loader.jsx";
import CreateInstructor from "./pages/admin/instructor/CreateInstructor.jsx";
import AllInstructors from "./pages/admin/instructor/AllInstructors.jsx";
import UpdateInstructor from "./pages/instructor/UpdateInstructor.jsx";
import AllStudents from "./pages/admin/students/AllStudents.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { initializing } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(restoreSession({ token, user: JSON.parse(user) }));
    } else {
      dispatch(finishInitialization());
    }
  }, []);

  if (initializing) {
    return <Loader />;
  }

  return (
    <Router>
      <Toaster/>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
        </Route>

        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute roles={["instructor"]}>
              <InstructorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InstructorDashboard />} />
          <Route path="course/create" element={<CreateCourse />} />
          <Route path="course/update/:id" element={<UpdateCourse />} />

          <Route path="course/update/:id" element={<CreateCourse />} />
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
          <Route path="instructor/create" element={<CreateInstructor/>}/>
          <Route path="instructors" element={<AllInstructors/>}/>
          <Route path="instructor/update/:id" element={<UpdateInstructor/>}/>
          <Route path="students" element={<AllStudents/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
