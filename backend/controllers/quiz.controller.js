import { Quiz } from "../models/quiz.models.js";
import { Course } from "../models/course.models.js";
import XLSX from "xlsx";

// create a new Quiz
export const uploadQuizFromExcel = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { courseId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No Excel file uploaded" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      return res.status(400).json({ message: "Excel sheet is empty" });
    }

    const quiztitle = sheetData[0].title;

    const questions = sheetData.map((row) => ({
      questionText: row.questionText,
      options: [row.option1, row.option2, row.option3, row.option4],
      correctAnswerIndex: row.correctAnswerIndex,
      marks: row.marks || 1,
    }));

    const totalMarks = questions.reduce((acc,q)=> acc + q.marks,0)

    const newQuiz = new Quiz({
      title:quiztitle,
      course:courseId,
      instructor:instructorId,
      questions,
      totalMarks,
      passingMarks:Math.floor(totalMarks*0.4),
      timeLimit:15,
    })

    await newQuiz.save();

     res.status(201).json({
      message: "Quiz uploaded successfully",
      // quiz: newQuiz,
    });

  } catch (error) {
    res.status(500).json({message:"Server error",error:error.message})
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
    const quizzes = await Quiz.find({ course: courseId }).populate(
      "instructor",
      "name email bio"
    );
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all Quizzes created by an Instructor
export const getQuizzesByInstructor = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const quizzes = await Quiz.find({ instructor: instructorId }).populate(
      "course",
      "title"
    );
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
