import express from "express";
import {
  authenticate,
  allowInstructor,
} from "../middlewares/auth.middleware.js";
import {
  createCourse,
  updateCourse,
  getCourseById,
  getAllCourses,
  deleteCourse,
  publishCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

// Course routes
router.post("/create", authenticate, allowInstructor, createCourse);
router.patch("/:courseId/publish", authenticate, allowInstructor, publishCourse);
router.patch("/:courseId", authenticate, allowInstructor, updateCourse);
router.get("/:courseId", getCourseById);
router.get("/", getAllCourses);
router.delete("/:courseId", authenticate, allowInstructor, deleteCourse);


export default router;