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
import { restoreSession } from "./redux/features/auth/authSlice.js";
import CreateCourse from "./pages/instructor/course/CreateCourse.jsx";
import UpdateCourse from "./pages/instructor/course/UpdateCourse.jsx";
import Loader from "./components/Loader.jsx";

function App() {
  const dispatch = useDispatch();
  const {initializing }= useSelector((state)=>state.auth)

useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(restoreSession({ token, user: JSON.parse(user) }));
    } else {
      dispatch(finishInitialization());
    }
  }, []);

  if(initializing){
    return <Loader/>
  }

  return (
    <Router>
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
        <Route path="/" element={<Home />} />

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
          
          <Route path="course/update/:id"  element={<CreateCourse />} />
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
