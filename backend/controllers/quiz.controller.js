import { Quiz } from "../models/quiz.models.js";
import { Course } from "../models/course.models.js";

// create a new Quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, questions, courseId } = req.body;
    const instructorId = req.user.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const newQuiz = new Quiz({
      title,
      questions,
      course: courseId,
      instructor: instructorId,
    });
    await newQuiz.save();
    res.status(201).json({ quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get Quiz details by ID
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate(
      "instructor",
      "name email bio"
    );
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update Quiz details
export const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, questions } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    if (title) quiz.title = title;
    if (questions) quiz.questions = questions;
    await quiz.save();
    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// delete a Quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all Quizzes for a Course
export const getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.find({ course: courseId }).populate("instructor", "name email bio");
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all Quizzes created by an Instructor
export const getQuizzesByInstructor = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const quizzes = await Quiz.find({ instructor: instructorId }).populate("course", "title");
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
