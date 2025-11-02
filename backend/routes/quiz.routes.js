import express from "express";
import {
  authenticate,
    allowInstructor,
} from "../middlewares/auth.middleware.js";
import {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getQuizzesByCourse,
  getQuizzesByInstructor
} from "../controllers/quiz.controller.js";
const router = express.Router();

// Quiz routes
router.post("/create", authenticate, allowInstructor, createQuiz);
router.get("/:quizId", getQuizById);
router.patch("/:quizId", authenticate, allowInstructor, updateQuiz);
router.delete("/:quizId", authenticate, allowInstructor, deleteQuiz);
router.get("/course/:courseId", getQuizzesByCourse);
router.get("/instructor/me", authenticate, allowInstructor, getQuizzesByInstructor);

export default router;