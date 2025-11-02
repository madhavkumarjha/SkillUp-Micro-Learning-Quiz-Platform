import {
  createStudent,
  getStudentById,
  getStudentLeaderboard,
  enrollStudentInCourse,
  getStudentCourses,
  updateStudent,
} from "../controllers/student.controller.js";

import express from "express";
import { authenticate, allowStudent } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Student routes for managing students
router.post("/create", createStudent);
router.post("/:studentId/enroll/:courseId", authenticate, allowStudent, enrollStudentInCourse);
router.patch("/:studentId", authenticate, allowStudent, updateStudent);
router.get("/:studentId", authenticate, allowStudent, getStudentById);
router.get(
  "/:studentId/leaderboard",
  authenticate,
  allowStudent,
  getStudentLeaderboard
);
router.get(
  "/:studentId/courses",
  authenticate,
  allowStudent,
  getStudentCourses
);

export default router;
